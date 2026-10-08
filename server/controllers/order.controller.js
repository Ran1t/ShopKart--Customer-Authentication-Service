import crypto from "crypto";
import mongoose from "mongoose";
import { Customer } from "../models/customer.model.js";
import { Product } from "../models/product.model.js";
import { Order } from "../models/order.model.js";

const getRazorpay = () => {
  const keyId = process.env.RAZORPAY_KEY_ID || process.env.TEST_RAZORPAY_KEY;
  const keySecret = process.env.RAZORPAY_KEY_SECRET || process.env.TEST_RAZORPAY_SECRET || process.env.TSET_RAZORPAY_SECRET;
  if (!keyId || !keySecret) throw new Error("Razorpay test credentials are not configured on the server");
  if (!keyId.startsWith("rzp_test_")) throw new Error("Only Razorpay Test Mode keys are accepted");
  return { keyId, keySecret };
};

const validateAddress = (address) => {
  const fields = ["fullName", "phone", "addressLine1", "city", "state", "pincode"];
  if (!address || fields.some((field) => typeof address[field] !== "string" || !address[field].trim())) return "All shipping fields are required.";
  if (!/^\+?[0-9][0-9\s()-]{7,14}$/.test(address.phone.trim())) return "Enter a valid phone number.";
  if (!/^\d{6}$/.test(address.pincode.trim())) return "Pincode must contain 6 digits.";
  return null;
};

export const createPaymentOrder = async (req, res) => {
  let shopKartOrder;
  try {
    const addressError = validateAddress(req.body.shippingAddress);
    if (addressError) return res.status(400).json({ success: false, message: addressError });

    const customer = await Customer.findById(req.customer._id);
    if (!customer || !customer.cart.length) return res.status(400).json({ success: false, message: "Your cart is empty." });
    const ids = customer.cart.map((item) => item.product);
    const products = await Product.find({ _id: { $in: ids } });
    const byId = new Map(products.map((product) => [product._id.toString(), product]));
    const items = [];
    let totalAmount = 0;
    for (const cartItem of customer.cart) {
      const product = byId.get(cartItem.product.toString());
      if (!product) return res.status(400).json({ success: false, message: "A product in your cart is no longer available. Remove it and try again." });
      if (!Number.isInteger(cartItem.quantity) || cartItem.quantity < 1 || product.stock < cartItem.quantity) {
        return res.status(400).json({ success: false, message: `Insufficient stock for ${product.name}.` });
      }
      items.push({ product: product._id, name: product.name, price: product.price, quantity: cartItem.quantity, image: product.image });
      totalAmount += product.price * cartItem.quantity;
    }
    if (!Number.isFinite(totalAmount) || totalAmount <= 0) return res.status(400).json({ success: false, message: "Order total is invalid." });

    shopKartOrder = await Order.create({
      user: customer._id, items, shippingAddress: Object.fromEntries(Object.entries(req.body.shippingAddress).map(([key, value]) => [key, value.trim()])),
      totalAmount: Math.round(totalAmount * 100) / 100, status: "PENDING_PAYMENT", paymentStatus: "PENDING",
    });
    const { keyId, keySecret } = getRazorpay();
    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: Math.round(shopKartOrder.totalAmount * 100), currency: "INR", receipt: shopKartOrder._id.toString() }),
    });
    const razorpayOrder = await response.json();
    if (!response.ok) throw new Error(razorpayOrder.error?.description || "Razorpay could not create the payment order");
    shopKartOrder.razorpayOrderId = razorpayOrder.id;
    await shopKartOrder.save();
    return res.status(201).json({ success: true, shopKartOrderId: shopKartOrder._id, razorpayOrderId: razorpayOrder.id, amount: razorpayOrder.amount, currency: razorpayOrder.currency, key: keyId });
  } catch (error) {
    if (shopKartOrder && !shopKartOrder.razorpayOrderId) await Order.findByIdAndDelete(shopKartOrder._id).catch(() => {});
    console.error("Create payment order failed:", error.message);
    return res.status(500).json({ success: false, message: "Unable to start payment. Please try again." });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { shopKartOrderId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    if (!mongoose.Types.ObjectId.isValid(shopKartOrderId) || !razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ success: false, message: "Payment details are incomplete." });
    }
    const order = await Order.findOne({ _id: shopKartOrderId, user: req.customer._id });
    if (!order) return res.status(404).json({ success: false, message: "Order not found." });
    if (order.paymentStatus === "PAID") return res.status(200).json({ success: true, order });
    if (!order.razorpayOrderId || order.razorpayOrderId !== razorpay_order_id) return res.status(400).json({ success: false, message: "Payment order does not match." });

    const { keySecret } = getRazorpay();
    const expected = crypto.createHmac("sha256", keySecret).update(`${order.razorpayOrderId}|${razorpay_payment_id}`).digest();
    const supplied = Buffer.from(razorpay_signature, "hex");
    if (expected.length !== supplied.length || !crypto.timingSafeEqual(expected, supplied)) {
      return res.status(400).json({ success: false, message: "Invalid payment signature." });
    }

    const customer = await Customer.findById(req.customer._id);
    if (!customer) return res.status(404).json({ success: false, message: "Customer not found." });
    order.paymentStatus = "PAID";
    order.status = "PLACED";
    order.razorpayPaymentId = razorpay_payment_id;
    await order.save();
    customer.cart = [];
    await customer.save();
    return res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("Payment verification failed:", error.message);
    return res.status(500).json({ success: false, message: "Unable to verify payment. Please contact support if payment was deducted." });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.customer._id }).sort({ createdAt: -1 });
    return res.json({ success: true, orders });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Unable to load orders." });
  }
};

export const getOrder = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ success: false, message: "Invalid order ID." });
    const order = await Order.findOne({ _id: req.params.id, user: req.customer._id });
    if (!order) return res.status(404).json({ success: false, message: "Order not found." });
    return res.json({ success: true, order });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Unable to load order." });
  }
};

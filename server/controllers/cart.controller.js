import mongoose from "mongoose";
import { Customer } from "../models/customer.model.js";
import { Product } from "../models/product.model.js";

export const addToCart = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ success: false, message: "Invalid product ID" });
    }

    const customer = await Customer.findById(req.customer._id);
    if (!customer) {
      return res.status(404).json({ success: false, message: "Customer not found" });
    }

    const productExists = await Product.exists({ _id: productId });
    if (!productExists) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // Reserve one unit immediately. The filter makes simultaneous add requests
    // unable to take stock below zero.
    const reservedProduct = await Product.findOneAndUpdate(
      { _id: productId, stock: { $gt: 0 } },
      { $inc: { stock: -1 } },
      { new: true }
    );
    if (!reservedProduct) {
      return res.status(400).json({ success: false, message: "Product is out of stock" });
    }

    const existingItem = customer.cart.find((item) => item.product.toString() === productId);
    if (existingItem) existingItem.quantity += 1;
    else customer.cart.push({ product: reservedProduct._id, quantity: 1 });

    try {
      await customer.save();
    } catch (saveError) {
      await Product.updateOne({ _id: productId }, { $inc: { stock: 1 } });
      throw saveError;
    }

    const populatedCustomer = await Customer.findById(req.customer._id).populate({
      path: "cart.product",
      select: "name price image stock category description",
    });

    return res.status(200).json({
      success: true,
      message: "Cart updated",
      cart: populatedCustomer.cart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update cart",
      error: error.message,
    });
  }
};

export const getCart = async (req, res) => {
  try {
    const customer = await Customer.findById(req.customer._id).populate({
      path: "cart.product",
      select: "name price image stock category description",
    });

    if (!customer) {
      return res.status(404).json({ success: false, message: "Customer not found" });
    }

    return res.status(200).json({
      success: true,
      cart: customer.cart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to load cart",
      error: error.message,
    });
  }
};

export const updateCartQuantity = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ success: false, message: "Invalid product ID" });
    }

    if (!Number.isInteger(quantity) || quantity < 1) {
      return res.status(400).json({ success: false, message: "Quantity must be at least 1" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const customer = await Customer.findById(req.customer._id);
    if (!customer) {
      return res.status(404).json({ success: false, message: "Customer not found" });
    }

    const cartItem = customer.cart.find((item) => item.product.toString() === productId);
    if (!cartItem) {
      return res.status(404).json({ success: false, message: "Product not in cart" });
    }

    const previousQuantity = cartItem.quantity;
    const difference = quantity - previousQuantity;
    if (difference > 0) {
      const reservedProduct = await Product.findOneAndUpdate(
        { _id: productId, stock: { $gte: difference } },
        { $inc: { stock: -difference } },
        { new: true }
      );
      if (!reservedProduct) {
        return res.status(400).json({
          success: false,
          message: "Requested quantity exceeds available stock",
        });
      }
    } else if (difference < 0) {
      await Product.updateOne({ _id: productId }, { $inc: { stock: -difference } });
    }
    cartItem.quantity = quantity;
    try {
      await customer.save();
    } catch (saveError) {
      if (difference > 0) await Product.updateOne({ _id: productId }, { $inc: { stock: difference } });
      else if (difference < 0) await Product.updateOne({ _id: productId, stock: { $gte: -difference } }, { $inc: { stock: difference } });
      throw saveError;
    }

    const updatedCustomer = await Customer.findById(req.customer._id).populate({
      path: "cart.product",
      select: "name price image stock category description",
    });

    return res.status(200).json({
      success: true,
      message: "Cart updated",
      cart: updatedCustomer.cart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update cart quantity",
      error: error.message,
    });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ success: false, message: "Invalid product ID" });
    }

    const customer = await Customer.findById(req.customer._id);
    if (!customer) {
      return res.status(404).json({ success: false, message: "Customer not found" });
    }

    const cartItem = customer.cart.find((item) => item.product.toString() === productId);
    if (!cartItem) {
      return res.status(404).json({ success: false, message: "Product not in cart" });
    }

    await Product.updateOne({ _id: productId }, { $inc: { stock: cartItem.quantity } });
    customer.cart = customer.cart.filter((item) => item.product.toString() !== productId);
    try {
      await customer.save();
    } catch (saveError) {
      await Product.updateOne({ _id: productId, stock: { $gte: cartItem.quantity } }, { $inc: { stock: -cartItem.quantity } });
      throw saveError;
    }

    const updatedCustomer = await Customer.findById(req.customer._id).populate({
      path: "cart.product",
      select: "name price image stock category description",
    });

    return res.status(200).json({
      success: true,
      message: "Product removed from cart",
      cart: updatedCustomer.cart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to remove product from cart",
      error: error.message,
    });
  }
};

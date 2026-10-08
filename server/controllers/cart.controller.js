import mongoose from "mongoose";
import { Customer } from "../models/customer.model.js";
import { Product } from "../models/product.model.js";

export const addToCart = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ success: false, message: "Invalid product ID" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const customer = await Customer.findById(req.customer._id);
    if (!customer) {
      return res.status(404).json({ success: false, message: "Customer not found" });
    }

    const existingItem = customer.cart.find((item) => item.product.toString() === productId);
    if (existingItem) {
      const nextQuantity = existingItem.quantity + 1;
      if (nextQuantity > product.stock) {
        return res.status(400).json({
          success: false,
          message: "Requested quantity exceeds available stock",
        });
      }
      existingItem.quantity = nextQuantity;
    } else {
      if (product.stock < 1) {
        return res.status(400).json({
          success: false,
          message: "Product is out of stock",
        });
      }
      customer.cart.push({ product: product._id, quantity: 1 });
    }

    await customer.save();

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

    if (quantity > product.stock) {
      return res.status(400).json({
        success: false,
        message: "Requested quantity exceeds available stock",
      });
    }

    cartItem.quantity = quantity;
    await customer.save();

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

    const beforeCount = customer.cart.length;
    customer.cart = customer.cart.filter((item) => item.product.toString() !== productId);

    if (customer.cart.length === beforeCount) {
      return res.status(404).json({ success: false, message: "Product not in cart" });
    }

    await customer.save();

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

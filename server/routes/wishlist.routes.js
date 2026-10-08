import express from "express";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "../controllers/wishlist.controller.js";

const wishlistRoutes = express.Router();

wishlistRoutes.use(isAuthenticated);
wishlistRoutes.post("/:productId", addToWishlist);
wishlistRoutes.get("/", getWishlist);
wishlistRoutes.delete("/:productId", removeFromWishlist);

export default wishlistRoutes;

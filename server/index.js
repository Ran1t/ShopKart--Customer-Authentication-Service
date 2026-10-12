import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import customerRoutes from "./routes/customer.routes.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import productRoutes from "./routes/product.routes.js";
import wishlistRoutes from "./routes/wishlist.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import orderRoutes from "./routes/order.routes.js";

const app = express();
const PORT = process.env.PORT || 8000;

dotenv.config();

mongoose.connect(process.env.dbUrl).then(() => {
    console.log("DB Connected");
}).catch((err) => {
    console.log(err);
});

const allowedOrigins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:4173",
    "http://127.0.0.1:4173",
    ...(process.env.FRONTEND_URL || "").split(",").map((origin) => origin.trim()).filter(Boolean),
];

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
app.use("/customers", customerRoutes);
app.use("/products", productRoutes);
app.use("/wishlist", wishlistRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", orderRoutes);

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server started at port ${PORT}`);
});

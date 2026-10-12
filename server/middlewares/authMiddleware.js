import jwt from "jsonwebtoken"
import { Customer } from "../models/customer.model.js"

export const isAuthenticated=async(req,res,next)=>{
    const token=req.cookies.token
    if(!token){
        return res.status(401).json({message:"Not Authorized"})
    }

    let decoded
    try {
        decoded=jwt.verify(token,process.env.JWT_SECRET)
    } catch (error) {
        if (error.name === "TokenExpiredError" || error.name === "JsonWebTokenError") {
            const isProduction = process.env.NODE_ENV === "production"
            res.clearCookie("token", {
                httpOnly: true,
                secure: isProduction,
                sameSite: isProduction ? "none" : "lax",
            })
            return res.status(401).json({message:"Session expired or invalid. Please log in again."})
        }
        return next(error)
    }

    const customer=await Customer.findById(decoded.userId)
    if(!customer){
        return res.status(404).json({message:"Customer Not Found, Token Invalid"})
    }
    req.customer=customer
    next()       // moves to next middleware/controller.
}

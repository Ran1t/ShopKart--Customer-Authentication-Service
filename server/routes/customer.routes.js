import express from "express"
import { getUser, loginCustomer, registerCustomer } from "../controllers/customer.controller.js"
import { isAuthenticated } from "../middlewares/authMiddleware.js"

const customerRoutes=express.Router()

// registration 

customerRoutes.post("/register",registerCustomer)
customerRoutes.post("/login",loginCustomer)
customerRoutes.get("/me",isAuthenticated,getUser)      // (path , middleware , controller)

export default customerRoutes 
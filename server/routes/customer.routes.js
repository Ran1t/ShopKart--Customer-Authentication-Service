import express from "express"
import { loginCustomer, registerCustomer } from "../controllers/customer.controller.js"

const customerRoutes=express.Router()

// registration 

customerRoutes.post("/register",registerCustomer)
customerRoutes.post("/login",loginCustomer)

export default customerRoutes 
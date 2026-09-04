import { Customer } from "../models/customer.model.js"

export const registerCustomer= async (req,res)=>{
    try{
        const {fullname,email,password,phone}=req.body

        if(!fullname || !email || !password || !phone){
            return res.status(400).json({message:"All fields required"})
        }

        if(password.length<6){
            return res.status(400).json({message:"Password Length should be greater than 6"})
        }

        const emailExists= await Customer.findOne({email})
        if(emailExists){
            return res.status(409).json({message:"Email already exists"})
        }
        const newCustomer=await Customer.create({
            fullname,
            email,
            password,
            phone
        }) 
        res.status(201).json({message:"Customer Registered"})
    }
    catch(error){
        res.status(500).json({message:"Internal Server Error"})
    }
}


export const loginCustomer=async (req,res)=>{
    try{
        const {email,password}=req.body
        const customer=await Customer.findOne({email})
        if(!customer){
            return res.status(404).json({message:"User Not Found"})
        }
        
        res.status(200).json({message:"User Logged In"})
    }
    catch(error){
        res.status(500).json({message:"Internal Server Error",error:error})
    }
}
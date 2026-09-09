import { Customer } from "../models/customer.model.js"
import bcrypt from "bcrypt"
import { genToken } from "../utils/generateTokens.js"

const cookiesOptions={
    httpOnly : true,
    secure : true
}

export const registerCustomer= async (req,res)=>{
    try{
        const {fullname,email,password,phone}=req.body

        if(!fullname || !email || !password || !phone){
            return res.status(400).json({message:"Missing Fields"})
        }

        if(password.length<6){
            return res.status(400).json({message:"Password too short"})
        }

        const emailExists= await Customer.findOne({email})
        if(emailExists){
            return res.status(409).json({message:"Email already exists"})
        }

        // password security

        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)

        const newCustomer=await Customer.create({
            fullname,
            email,
            password : hashedPassword,
            phone
        }) 

        // jwt token

        const token=genToken(newCustomer._id)

        res.cookie("token",token,cookiesOptions)

        res.status(201).json({success:true ,message:"Customer Registered Successfully",customer:newCustomer})
    }
    catch(error){
        res.status(500).json({message:"Internal Server Error",error:error})
    }
}


export const loginCustomer=async (req,res)=>{
    try{
        const {email,password}=req.body
        const customer=await Customer.findOne({email})
        if(!customer){
            return res.status(404).json({message:"Invalid Credentials"})
        }
        
        const passwordCheck=await bcrypt.compare(password,customer.password)

        if(!passwordCheck){
            return res.status(400).json({message:"Wrong Password"})
        }

        // jwt token 

        const token=genToken(customer._id)
        res.cookie("token",token,cookiesOptions)

        res.status(200).json({success:true, message:"Login Successfully"})
    }
    catch(error){
        res.status(500).json({message:"Internal Server Error",error:error})
    }
}
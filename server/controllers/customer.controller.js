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

        // Remove password before sending customer data
        const customerData=newCustomer.toObject()
        delete customerData.password

        res.status(201).json({success:true ,message:"Customer Registered Successfully",customer:customerData})
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
            return res.status(401).json({message:"Invalid Credentials"})
        }
        
        const passwordCheck=await bcrypt.compare(password,customer.password)

        if(!passwordCheck){
            return res.status(401).json({message:"Invalid Credentials"})
        }

        // jwt token 

        const token=genToken(customer._id)
        res.cookie("token",token,cookiesOptions)

        // Remove password before sending customer data

        const customerData=customer.toObject()
        delete customerData.password


        res.status(200).json({success:true, message:"Login Successfull",customer:customerData})
    }
    catch(error){
        res.status(500).json({message:"Internal Server Error",error:error})
    }
}

export const getUser=async(req,res)=>{
    // Remove password before sending customer data
    const customerData =req.customer.toObject()
    delete customerData.password
    res.status(200).json({"message":"Customer Authenticated",customer:customerData})
}

export const logoutCustomer=async(req,res)=>{
    res.clearCookie("token",cookiesOptions)
    res.status(200).json({"success":true,"message":"Logout Successfully"})
}

export const changePassword= async(req,res)=>{
    try{
        const {old_password,new_password}=req.body

        if(!old_password || !new_password){
            return res.status(400).json({message:"Old and New password required"})
        }

        if(new_password.length<6){
            return res.status(400).json({message:"New Password too short"})
        }

        // verifying the old password 

        const passwordCheck=await bcrypt.compare(old_password,req.customer.password)

        if(!passwordCheck){
            return res.status(400).json({message:"Incorrect Old Password"})
        }

        // hashing the new password 

        const salt=await bcrypt.genSalt(10)
        const new_hashedPassword=await bcrypt.hash(new_password,salt)

        // save new password

        req.customer.password=new_hashedPassword
        await req.customer.save()   // saves the current state of customer object in mongoDB

        res.status(200).json({success:true,message:"Password Changed Successfully"})
    }
    catch(error){
        res.status(500).json({message:"Internal Server Error",error:error})
    }
}
import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import customerRoutes from "./routes/customer.routes.js"
import cookieParser from "cookie-parser"
import cors from "cors"

const app=express()
const PORT=8000

dotenv.config()

mongoose.connect(process.env.dbUrl).then(()=>{
    console.log("DB Connected")
}).catch((err)=>{
    console.log(err)
})

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use(express.json())
app.use(cookieParser())
app.use("/customers",customerRoutes)

app.listen(PORT,()=>{
    console.log(`Server started at port ${PORT}`)
})
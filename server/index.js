import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import customerRoutes from "./routes/customer.routes.js"

const app=express()
const PORT=8000

dotenv.config()

mongoose.connect(process.env.dbUrl).then(()=>{
    console.log("DB Connected")
}).catch((err)=>{
    console.log(err)
})

app.use(express.json())
app.use("/users",customerRoutes)

app.listen(PORT,()=>{
    console.log(`Server started at port ${PORT}`)
})
import express from "express";
import { connectDB } from "./config/dbconnect.js";
import dotenv from "dotenv";
import authRouter from "./routes/authRoute.js";
const app=express();

app.use(express.json());
dotenv.config();
connectDB();

app.use('',authRouter);





app.listen(5000,()=>{
    console.log("server is running on port 5000");
})





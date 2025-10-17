import express from "express";
import { connectDB } from "./config/dbconnect.js";
import dotenv from "dotenv";
import authRouter from "./routes/authRoute.js";
import contentRouter from "./routes/contentRoutes.js";
const app=express();

app.use(express.json());
dotenv.config();
connectDB();

app.use('',authRouter);
app.use('',contentRouter);





app.listen(5000,()=>{
    console.log("server is running on port 5000");
})





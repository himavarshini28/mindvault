import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { connectDB } from "./config/dbconnect.js";
import authRouter from "./routes/authRoute.js";
import contentRouter from "./routes/contentRoutes.js";
import shareRoute from "./routes/shareRoute.js";
const app=express();

app.use(
    cors({
        origin: true,
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization", "authorization", "token"],
    })
);



app.use(express.json());
connectDB();

app.use('',authRouter);
app.use('',contentRouter);
app.use('',shareRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});





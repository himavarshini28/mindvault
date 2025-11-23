import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { connectDB } from "./config/dbconnect.js";
import authRouter from "./routes/authRoute.js";
import contentRouter from "./routes/contentRoutes.js";
import shareRoute from "./routes/shareRoute.js";
const app=express();

// Allow frontend origin(s). Set FRONTEND_URL in production (e.g. https://your-frontend.onrender.com)
const allowedOrigins = [process.env.FRONTEND_URL ?? "http://localhost:5173", "http://localhost:5174"];
app.use(
    cors({
        origin: (origin, callback) => {
            // allow requests with no origin (e.g. curl, server-to-server)
            if (!origin) return callback(null, true);
            if (allowedOrigins.includes(origin)) return callback(null, true);
            return callback(new Error("CORS not allowed"), false);
        },
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization", "token"]
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





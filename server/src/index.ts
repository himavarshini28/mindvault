import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { connectDB } from "./config/dbconnect.js";
import authRouter from "./routes/authRoute.js";
import contentRouter from "./routes/contentRoutes.js";
import shareRoute from "./routes/shareRoute.js";
const app=express();

const FRONTEND_URL = process.env.FRONTEND_URL;
if (FRONTEND_URL) {
    const allowedOrigins = [FRONTEND_URL, "http://localhost:5174"];
    app.use(
        cors({
            origin: (origin, callback) => {
                if (!origin) return callback(null, true);
                if (allowedOrigins.includes(origin)) return callback(null, true);
                return callback(new Error("CORS not allowed"), false);
            },
            credentials: true,
            methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            allowedHeaders: ["Content-Type", "Authorization", "token"],
        })
    );
} else {
    // No FRONTEND_URL configured: allow all origins (useful for testing). Set FRONTEND_URL in production.
    app.use(
        cors({
            origin: true,
            credentials: true,
            methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            allowedHeaders: ["Content-Type", "Authorization", "token"],
        })
    );
}



app.use(express.json());
connectDB();

app.use('',authRouter);
app.use('',contentRouter);
app.use('',shareRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});





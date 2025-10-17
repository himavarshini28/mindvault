import type { Request,Response,NextFunction } from "express";
import jwt from "jsonwebtoken";
import { userModel } from "../db.js";

const jwt_secret_key="mind_vault_secret_key";

export const authMiddleware=async(req:Request,res:Response,next:NextFunction)=>{
    const token=req.headers.authorization;
    try{
        if(!token) return res.status(403).json({message:"Authorization header missing"});
        
        const decode = jwt.verify(token, jwt_secret_key) as any;
        console.log("Decoded token:", decode); // Debug log
        
        if(!decode.userId) {
            return res.status(401).json({
                message: "Invalid token: userId not found in token",
                decoded: decode
            });
        }
        
        //@ts-ignore
        req.userId = decode.userId;
        //@ts-ignore
        console.log("User ID set on request:", req.userId); // Debug log
        next();
    }
    catch(err)
    {
        console.error("Auth middleware error:", err);
        return res.status(401).json({message: "Invalid or expired token", error: err});
    }
}
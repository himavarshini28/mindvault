import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { contentModel } from "../db.js";

const contentRouter=express.Router();

contentRouter.post("/api/v1/content",authMiddleware,async(req,res)=>{
    const {link,type,title,tags}=req.body;
    //@ts-ignore
    const userId=req.userId;
    
    console.log("Content route - userId from req:", userId); // Debug log
    console.log("Content route - body:", {link, type, title, tags}); // Debug log
    
    try {
        if(!userId) {
            return res.status(401).json({message: "User ID not found in request"});
        }
        
        const content=await contentModel.create({link,type,title,tags,userId});
        return res.json({message: "Content created successfully", content});
    } catch (error) {
        console.error("Content creation error:", error); // Debug log
        return res.status(500).json({message: "Error creating content", error});
    }
})
// contentRouter.get("/api/v1/content",)
// contentRouter.delete("/api/v1/content",)
export default contentRouter;
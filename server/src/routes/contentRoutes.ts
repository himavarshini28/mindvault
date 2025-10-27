import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { contentModel } from "../db.js";

const contentRouter=express.Router();

contentRouter.post("/api/v1/content",authMiddleware,async(req,res)=>{
    const {link,type,title,tags}=req.body;
    //@ts-ignore
    const userId=req.userId;
    
    console.log("Content route - userId from req:", userId);
    console.log("Content route - body:", {link, type, title, tags});
    
    try {
        if(!userId) {
            return res.status(401).json({message: "User ID not found in request"});
        }
        
        const content=await contentModel.create({link,type,title,tags,userId});
        return res.json({message: "Content created successfully", content});
    } catch (error) {
        console.error("Content creation error:", error);
        return res.status(500).json({message: "Error creating content", error});
    }
})
    contentRouter.get("/api/v1/content",authMiddleware,async(req,res)=>{
        //@ts-ignore
        const userId=req.userId;
        try
        {const content=await contentModel.find({userId});
        return res.status(200).json({content});}
        catch(err)
        {
            return res.status(500).json({message:err});
        }
    })
    contentRouter.delete("/api/v1/content",authMiddleware,async(req,res)=>{
        const contentId=req.body.contentId;
        try {
            await contentModel.deleteOne({_id:contentId});
            res.status(200).json({message:"successfully deleted"});
        } catch (error) {
            res.status(500).json({"message":error});
        }
    })
export default contentRouter;
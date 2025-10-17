import express from "express";
import jwt from "jsonwebtoken";
import {userModel} from "../db.js";

const authRouter=express.Router();
const jwt_secret_key="mind_vault_secret_key";

authRouter.post('/api/v1/signup',async(req,res)=>{
    //todo : zod validation,hash the password
    const {username,password}=req.body;
    try{
        if(username.length<3 || username.length>11 || !username)
        {
           return res.status(411).send("error in username");
        }
        if(password.length<3 || password.length>11 || !password)
        {
            return res.status(411).send("error in password");
        }
        const User=await userModel.findOne({username});
        if(User!=null)
        {
            return res.status(403).send("User already exists with this username");
        }
        const user=await userModel.create({
            username,password
        });
        res.json(
            {
                message:"user successfully signed in"
            }
        );
    }
    catch(err)
    {
        return res.status(500).json(err);
    }
})

authRouter.post('/api/v1/signin',async(req,res)=>
{

    const {username,password}=req.body;
    try
   { const user=await userModel.findOne({username,password});
    if(user)
    {
        const token=jwt.sign({username},jwt_secret_key);
        return res.json({token});
    }
    else{
        return res.status(403).json({message:"invalid credentials"});
    }
}
    catch(err)
    {
        return res.status(500).json(err);
    }
})
export default authRouter;
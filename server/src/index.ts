import express from "express";
import {userModel} from "./db.js";
const app=express();

app.use(express.json());


app.post('/api/v1/signup',async(req,res)=>{
    const {username,password}=req.body;
    try{
        if(username.length()<3 || username.length()>11 || !username)
        {
            res.status(411).send("error in username");
        }
        if(password.length()<3 || password.length()>11 || !password)
        {
            res.status(411).send("error in password");
        }
        const User=await userModel.findOne({username});
        if(User!=null)
        {
            res.status(403).send("User already exists with this username");
        }
        const user=userModel.create({
            username,password
        });
        res.json(
            {
                username,
                password
            }
        );
    }
    catch(err)
    {
        res.status(500).send(err);
    }
})



app.listen(5000,()=>{
    console.log("server is running on port 5000");
})





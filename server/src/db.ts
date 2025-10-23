import mongoose from "mongoose";

const userSchema=new mongoose.Schema(
    {
        username:
        {
            type:String,
            required:true,
            unique:true
        },
        password:
        {
            type:String,
            required:true,
            min:8,
            max:20
        }
    }
)


const tagSchema=new mongoose.Schema(
    {
        title:
        {
            type:String,
            required:true,
        }
    }
)

const contentEnum=["document","tweet","youtube","link"];

const contentSchema=new mongoose.Schema(
    {
        link:
        {
            type:String,
            required:true
        },
        type:
        {
            type:String,
            enum:contentEnum,
        },
        title:
        {
            type:String,
            required:true,
        },
        tags:
        {
            type:[mongoose.Types.ObjectId],
            ref:"tag"
        },
        userId:
        {
            type:mongoose.Types.ObjectId,
            required:true,
        },
        embedding:{
            type:[Number],
            required:false
        }
    }
)

const linkSchema=new mongoose.Schema(
    {
        hash:
        {
            type:String,
            required:true
        },
        userId:
        {
            type:mongoose.Types.ObjectId,
            required:true,
        }
    }
)

const userModel=mongoose.model("users",userSchema);
const tagModel=mongoose.model("tags",tagSchema);
const linkModel=mongoose.model("links",linkSchema);
const contentModel=mongoose.model("contents",contentSchema);

export {userModel,tagModel,linkModel,contentModel};


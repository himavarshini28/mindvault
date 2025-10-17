import mongoose from "mongoose";
export const connectDB=async()=>
{
    const connectString:string=process.env.MONGODB_URI||"";
   await mongoose.connect(connectString).then(()=>{
    console.log("MongoDB connected");
   })
}
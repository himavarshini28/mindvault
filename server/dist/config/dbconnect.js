import mongoose from "mongoose";
export const connectDB = async () => {
    const connectString = process.env.MONGODB_URI || "";
    await mongoose.connect(connectString).then(() => {
        console.log("MongoDB connected");
    });
};
//# sourceMappingURL=dbconnect.js.map
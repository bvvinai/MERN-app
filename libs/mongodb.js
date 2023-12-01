import mongoose from "mongoose";

const connectMongoDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://bvvinai:bvvinai@cluster0.vxwyerx.mongodb.net/");
        console.log("Connected to DB");
    } catch (error) {
        console.log(error);
    }
};

export default connectMongoDB;
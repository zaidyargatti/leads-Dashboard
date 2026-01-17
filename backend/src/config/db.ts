import mongoose from "mongoose";

const connectDB = async () =>{
    try {
        await  mongoose.connect(process.env.MONGO!);
         console.log("MongoDB Connceted!")
    } catch (error) {
        console.log("Connection Error:",error)
        process.exit(1);
    }
}

export default connectDB
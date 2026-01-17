import express, { type Request, type Response } from "express";
import cors from "cors";
import connectDB from "./config/db";
import dotenv from "dotenv";
import LeadRoutes from "./routes/lead";
import AuthRoutes from "./routes/auth";

dotenv.config();
connectDB();
const app = express();

app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173"
}))


app.use('/api/leads',LeadRoutes)
app.use('/api/authentication',AuthRoutes)

app.get('/',(req:Request,res:Response) =>{
    res.send("API is running...")
})

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Server is running on port http://localhost:${PORT}`);
})
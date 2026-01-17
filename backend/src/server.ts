import express, { type Request, type Response } from "express";
import cors from "cors";
import connectDB from "./config/db";
import dotenv from "dotenv";
import LeadRoutes from "./routes/lead";
import AuthRoutes from "./routes/auth";

dotenv.config();
connectDB();
const app = express();


const website =[
    "https://leads-dashboard-navy.vercel.app/",
    "http://localhost:5173",
    "https://vercel.com/9928zaid-gmailcoms-projects/leads-dashboard/LitY3p7kSFot1x5yPDosQzWWRLdk"
]
app.use(express.json());
app.use(cors({
    origin:website
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
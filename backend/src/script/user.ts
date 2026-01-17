import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { User } from "../models/user";
import connectDB from "../config/db";
dotenv.config();



const createAdminUser = async () => {
  try {
    await connectDB();

    const email = "y@yopmail.com";
    const plainPassword = "admin@123"; // change in prod

    // 🔍 Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("⚠️ Admin user already exists");
      process.exit(0);
    }

    // 🔐 Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

    // 👤 Create user
    await User.create({
      email,
      password: hashedPassword,
    });

    console.log("✅ Admin user created successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Failed to create admin user", error);
    process.exit(1);
  }
};

createAdminUser();

import mongoose from "mongoose";
import dotenv from "dotenv";
import { faker } from "@faker-js/faker";
import { Lead, LeadSource, LeadStatus } from "../models/lead";

dotenv.config();

const TOTAL_LEADS = 600;

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO as string);
};

const randomEnumValue = <T extends Record<string, string>>(
  enumObj: T
): T[keyof T] => {
  const values = Object.values(enumObj) as T[keyof T][];
  const randomIndex = Math.floor(Math.random() * values.length);
  return values[randomIndex]!;
};


const seedLeads = async () => {
  try {
    await connectDB();

    console.log("🗑️ Clearing existing leads...");
    await Lead.deleteMany({});

    const leads = Array.from({ length: TOTAL_LEADS }).map(() => ({
      name: faker.person.fullName(),
      email: faker.internet.email().toLowerCase(),
      phone: faker.phone.number(),
      company: faker.company.name(),
      source: randomEnumValue(LeadSource),
      status: randomEnumValue(LeadStatus),
      assignedTo: "Admin",
      createdAt: faker.date.past({ years: 1 }),
    }));

    await Lead.insertMany(leads);

    console.log(`✅ Seeded ${TOTAL_LEADS} leads successfully`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed", error);
    process.exit(1);
  }
};

seedLeads();

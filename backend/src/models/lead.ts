import mongoose, { Document, Schema } from "mongoose";

export enum LeadStatus {
  NEW = "New",
  CONTACTED = "Contacted",
  QUALIFIED = "Qualified",
  CONVERTED = "Converted",
}

export enum LeadSource {
  WEBSITE = "Website",
  REFERRAL = "Referral",
  ADS = "Ads",
  COLD_CALL = "Cold Call",
}

export interface ILead extends Document {
  name: string;
  email: string;
  phone: string;
  company: string;
  source: LeadSource;
  status: LeadStatus;
  assignedTo: string;
  createdAt: Date;
}

const LeadSchema = new Schema<ILead>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, index: true },
    phone: { type: String, required: true },
    company: { type: String, required: true, index: true },
    source: {
      type: String,
      enum: Object.values(LeadSource),
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(LeadStatus),
      default: LeadStatus.NEW,
      index: true,
    },
    assignedTo: { type: String, default: "Admin" },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

LeadSchema.index({
  name: "text",
  email: "text",
  company: "text",
});

export const Lead = mongoose.model<ILead>("Lead", LeadSchema);

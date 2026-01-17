import mongooose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    email: { type: String, required: true, unique: true },  
    password: { type: String, required: true }

},{timestamps: true})

export const User: Model<IUser> = mongooose.model<IUser>("User", UserSchema);
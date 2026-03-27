import mongoose, { Document, Schema } from "mongoose";

export interface IOTP extends Document {
  phone: string;
  otp: string;
  expiresAt: Date;
}

const otpSchema = new Schema<IOTP>({
  phone: { type: String, required: true },
  otp: { type: String, required: true },
  expiresAt: { 
    type: Date, 
    required: true, 
    expires: 300 
  },
}, { timestamps: true });

export default mongoose.model<IOTP>("OTP", otpSchema);
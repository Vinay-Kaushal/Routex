import mongoose, { Document, Schema } from "mongoose";

export interface ITrip extends Document {
  source: string;
  destination: string;
  distance: number;
  fuelCost: number;
  revenue: number;
  driverCost: number;
  profit: number;
}

const tripSchema = new Schema<ITrip>({
  source: String,
  destination: String,
  distance: Number,
  fuelCost: Number,
  revenue: Number,
  driverCost: Number,
  profit: Number
}, { timestamps: true });

export default mongoose.model<ITrip>("Trip", tripSchema);
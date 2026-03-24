import { Request, Response } from "express";
import Trip from "../models/Trip";
import { calculateTrip } from "../services/tripServices";

export const createTrip = async (req: Request, res: Response) => {
  try {
    const { distance, mileage, fuelPrice, revenue, driverCost } = req.body;

    const { fuelCost, profit } = calculateTrip(
      distance,
      mileage,
      fuelPrice,
      revenue,
      driverCost
    );

    const trip = await Trip.create({
      ...req.body,
      fuelCost,
      profit
    });

    res.json(trip);
  } catch (err) {
    res.status(500).json("Error creating trip");
  }
};

export const getTrips = async (_req: Request, res: Response) => {
  const trips = await Trip.find();
  res.json(trips);
};
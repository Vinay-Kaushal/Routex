import { Request, Response, NextFunction } from "express";

export const validateTrip = (req: Request, res: Response, next: NextFunction) => {
  const { source, destination, distance } = req.body;

  if (!source || !destination || !distance) {
    return res.status(400).json("Missing required fields");
  }

  next();
};
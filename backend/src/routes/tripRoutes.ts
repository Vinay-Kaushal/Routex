import express from "express";
import { createTrip, getTrips } from "../controllers/tripController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();


router.post("/create", protect, createTrip);
router.get("/", protect, getTrips);

export default router;
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";
import { errorHandler } from "./middleware/errorMiddleware";

import { connectDB } from "./config/db";
import authRoutes from "./routes/authRoutes";
import tripRoutes from "../src/routes/tripRoutes";

dotenv.config();
import "./config/passport";

const app = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.use("/api/auth", authRoutes);
app.use("/api/trips", tripRoutes);
app.use(errorHandler);

app.get("/", (_req, res) => {
  res.send("API is running ");
});

connectDB();

// Server start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
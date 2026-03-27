import express from "express";
import passport from "passport";

import {
  signup,
  login,
  requestOTP,
  verifyOTP
} from "../controllers/authController";

import jwt from "jsonwebtoken";

const router = express.Router();



router.post("/signup", signup);
router.post("/login", login);



router.post("/otp/request", requestOTP);
router.post("/otp/verify", verifyOTP);



router.get("/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/google/callback",
  passport.authenticate("google", { session: false }),
  (req: any, res) => {
    const token = jwt.sign({ id: req.user._id }, "secret");
    res.json({ token, user: req.user });
  }
);

export default router;
import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import OTP from "../models/OTP";
import { sendOTP } from "../services/otpServices";

// Generate JWT
const generateToken = (id: string) => {
  return jwt.sign({ id }, "secret", { expiresIn: "7d" });
};


// email-signup
export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = generateToken(user._id.toString());

    res.json({ token, user });
  } catch (err) {
    res.status(500).json("Signup error");
  }
};


// emaillogin

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !user.password) {
      return res.status(400).json("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json("Invalid credentials");
    }

    const token = generateToken(user._id.toString());

    res.json({ token, user });
  } catch (err) {
    res.status(500).json("Login error");
  }
};


// reqotp

export const requestOTP = async (req: Request, res: Response) => {
  try {
    const { phone } = req.body;

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await OTP.create({
      phone,
      otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    await sendOTP(phone, otp);

    res.json({ message: "OTP sent" });
  } catch (err) {
    res.status(500).json("OTP send failed");
  }
};

//verifyotp
export const verifyOTP = async (req: Request, res: Response) => {
  try {
    const { phone, otp } = req.body;

    const record = await OTP.findOne({ phone, otp });

    if (!record || record.expiresAt < new Date()) {
      return res.status(400).json("Invalid or expired OTP");
    }

    let user = await User.findOne({ phone });

    if (!user) {
      user = await User.create({ phone });
    }

    const token = generateToken(user._id.toString());

    res.json({ token, user });
  } catch (err) {
    res.status(500).json("OTP verification failed");
  }
};
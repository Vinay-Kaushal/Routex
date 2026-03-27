import twilio from "twilio";

const client = twilio(
    process.env.TWILIO_SID,
    process.env.TWILIO__AUTH_TOKEN
);

export const sendOTP = async (phone : string, otp: string,) =>{
    await client.messages.create({
        body : `Your OTP is ${otp}`,
        from: process.env.TWILIO_PHONE,
        to : phone,
    });
};
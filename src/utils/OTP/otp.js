import { nanoid } from "nanoid";

export const generateOTP = (expireTimeBySec=5) => {
  const otp = {
    code: nanoid(5), // Generate a 5-character OTP
    otpExpires: Date.now() + expireTimeBySec * 60 * 1000, // Expires in 5 minutes
  };
  return otp;
};


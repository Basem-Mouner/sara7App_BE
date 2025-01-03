import { EventEmitter } from "node:events";

import { generateEmailTemplate, sendEmail } from "../email.js";
import { generateToken } from "../token/token.js";
import { generateOtpTemplate, sendOtp } from "../email/sendOtp.js";
import { generateOTP } from "../OTP/otp.js";

export const emailEvent = new EventEmitter();

emailEvent.on("sendEmail", async (data) => {
    const { email, userName } = data;

 
  const emailToken= generateToken({
        payload: { email },
        signature:process.env.EMAIL_TOKEN_SIGNATURE,
      });


  const emailLink = `https://${process.env.FRONTEND_LINK}/confirmEmail/${emailToken}`;
  const html = generateEmailTemplate(emailLink, userName);

  await sendEmail({
    to: email,
    html,
  });
});




emailEvent.on("sendOTP", async (data) => {
  const { email, userName, otp } = data;

  const emailToken = generateToken({
    payload: { email },
    signature: process.env.EMAIL_TOKEN_SIGNATURE,
  });

  const html = generateOtpTemplate(otp, userName);

  await sendOtp({
    to: email,
    html,
  });
});






// await sendEmail({
//   to : ["basem.software@yahoo.com"],
//   cc : "",
//   bcc : "",
//   subject : "Hello ✔ confirm_Email",
//   text : "",
//   html : "",
//   attachments : [],
// })
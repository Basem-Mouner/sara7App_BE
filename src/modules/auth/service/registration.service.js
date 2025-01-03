import userModel from "../../../DB/model/user.model.js";
import { emailEvent } from "../../../utils/events/sendEmail.event.js";
import { asyncHandler } from "../../../utils/error/error.handling.js";
import { successResponse } from "../../../utils/response/success.response.js";
import { verifyToken } from "../../../utils/token/token.js";
import {  generateHash } from "../../../utils/security/hash.js";
import { generateEncryption } from "../../../utils/security/encryption.js";


export const signup = asyncHandler(async (req, res, next) => {
  const {
    userName,
    email,
    password,
    gender,
    confirmationPassword,
    phone,
    role,
  } = req.body;

  //check password and  confirmationPassword
  if (password != confirmationPassword) {
    return next(new Error("Passwords do not match", { cause: 400 }));
  }
  //check if user already exists
  if (await userModel.findOne({ email })) {
    return next(new Error("Email already exists", { cause: 409 }));
  }
  
  const user = await userModel.create({
    userName,
    email,
    password:generateHash(password), //default round in function is 7 in env salt=parseInt(process.env.SALT_ROUND)
    gender,
    role,
    phone: generateEncryption(phone), //default signature process.env.ENCRYPTION_SIGNATURE
  });

  // event send email for confirmation this email in signup
  emailEvent.emit("sendEmail", { userName, email });
  return successResponse({
    res,
    message: "done create new account successfully ",
    data: { user },
    status: 201,
  });
});

export const confirmEmail = asyncHandler(async (req, res, next) => {
  const { authorization } = req.headers;

  const { email } = verifyToken({
    token: authorization,
    signature: process.env.EMAIL_TOKEN_SIGNATURE,
  });
  
  

  //update confirmEmail for user
  await userModel.findOneAndUpdate({ email }, { confirmEmail: true });

  return successResponse({
    res,
    message: "Done email confirmed ",
    status: 200,
  });
});




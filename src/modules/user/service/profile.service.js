import { successResponse } from "../../../utils/response/success.response.js";
import { asyncHandler } from "../../../utils/error/error.handling.js";
import { decodeEncryption, generateEncryption } from "../../../utils/security/encryption.js";
import userModel from "../../../DB/model/user.model.js";
import { compareHash, generateHash } from "../../../utils/security/hash.js";
import { verifyToken } from "../../../utils/token/token.js";
import messageModel from "../../../DB/model/message.model.js";
import { generateOTP } from "../../../utils/OTP/otp.js";
import { emailEvent } from "../../../utils/events/sendEmail.event.js";

export const userProfileByToken = asyncHandler(
  async (req, res, next) => { 
    
    req.user.phone = decodeEncryption(req.user.phone);
    const messages = await messageModel
      .find({ recipientId: req.user._id })
      .populate([
        {
          path: "recipientId",
          select: "userName role",
        },
      ]);
   return successResponse({
     res,
     message: "users profile by id",
     data: {
       user: req.user,
       messages
      },
   });
  }); 


export const userProfileUpdate = asyncHandler(
  async (req, res, next) => {
    
    if (req.body.phone) {
      req.body.phone = generateEncryption(req.body.phone);   
    }

    const user = await userModel.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
      runValidators: true,
    });
    
    return successResponse({
      res,
      message: "users profile updated",
      data: { user },
    });
  }); 


export const passwordUpdate = asyncHandler(async (req, res, next) => {
  const { oldPassword, password } = req.body;
  if (!compareHash(oldPassword, req.user.password)) {
    return next(new Error("old password is not match", {cause:400})); 
  }
  const hashPassword = generateHash(password);
  const user = await userModel.findByIdAndUpdate(
    req.user._id,
    { password: hashPassword, changePasswordTime:Date.now() },
    {
      new: true,
    }
  );


    return successResponse({
      res,
      message: "password updated",
      data: { user },
    });
});


export const forgetPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  // check if email exist in DB
  const user = await userModel.findOne({ email });
  if (!user) {
    return next(new Error("email not found", { cause: 400 }));
  }

  //generate otp
  const otp = generateOTP();
  //hashing and assign to db with expire time
  user.otp = generateHash(String(otp.code));
  user.otpExpires =otp.otpExpires;
  user.save();
  //send otp to email for check
  // event send otp 
  emailEvent.emit("sendOTP", { userName: user.userName, email, otp: otp.code });

  return successResponse({
    res,
    message: " sending otp code check for your email and then reset your password",
  });
});

export const resetPassword = asyncHandler(async (req, res, next) => {
  const { email,password,otp } = req.body;
  // check if email exist in DB
  const user = await userModel.findOne({ email });
  if (!user) {
    return next(new Error("email not found", { cause: 400 }));
  }

  if (!compareHash(otp, user.otp)) {
    return next(new Error("invalid otp", { cause: 400 }));
  }
  if (user.otpExpires < Date.now()) {
    return next(new Error("OTP expired", { cause: 400 }));
 }

  await userModel.findOneAndUpdate(
    { email },
    { password: generateHash(password), changePasswordTime: Date.now() }
  );

  return successResponse({
    res,
    message:
      " password reset successfully you can login now",
  });
});
  

export const frizzAccount = asyncHandler(async (req, res, next) => {
  
  const user = await userModel.findByIdAndUpdate(
    req.user._id,
    { frizz: true, lastFrizzTime: Date.now() },
    {
      new: true,
    }
  );

  return successResponse({
    res,
    message: "Account frizzing",
    data: { user },
  });
});


export const deFrizzingAccount = asyncHandler(async (req, res, next) => {
  const { authorization } = req.headers;

  const { email } = verifyToken({
    token: authorization,
    signature: process.env.EMAIL_TOKEN_SIGNATURE,
  });

  //update confirmEmail for user
  await userModel.findOneAndUpdate({ email }, { frizz: false });

  return successResponse({
    res,
    message: "Done deFrizzing Account ",
    status: 200,
  });
});



export const shareUserProfile = asyncHandler(async (req, res, next) => {
  

 
  const user=await userModel
    .findById(req.params.userId)
    .select("userName gender image DOB");

  return user?successResponse({
    res,
    status: 200,
    data: {
      user,
    }
  }) :next(new Error("in-valid account",{cause:404}))
    
  ;
});
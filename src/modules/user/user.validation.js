import Joi from "joi";
import { generalFields } from "../../middleWare/validation.middleware.js";

export const updateProfile = Joi.object()
  .keys({
    userName: generalFields.userName,
    phone: generalFields.phone,
    gender: generalFields.gender,
    DOB: generalFields.DOB,
  })
  .options({
    allowUnknown: false, //very dangerous at assign true be carful
  })
  .required();

export const updatePassword = Joi.object()
  .keys({
    oldPassword: generalFields.password.required(),
    password: generalFields.password.not(Joi.ref("oldPassword")).required(),
    confirmationPassword: generalFields.confirmationPassword
      .valid(Joi.ref("password"))
      .required(),
  })
  .options({
    allowUnknown: false, //very dangerous at assign true be carful
  })
  .required();

  export const forgetPassword = Joi.object()
    .keys({
      email: generalFields.email.required(),
    })
    .options({
      allowUnknown: false, //very dangerous at assign true be carful
    })
  .required();
    
    export const resetPassword = Joi.object()
      .keys({
        email: generalFields.email.required(),
        password: generalFields.password.required(),
        otp:Joi.string().min(5).max(5).required()
      })
      .options({
        allowUnknown: false, //very dangerous at assign true be carful
      })
      .required();


  export const shareProfile = Joi.object()
    .keys({
      userId: generalFields.id.required(),
    })
    .options({
      allowUnknown: false, //very dangerous at assign true be carful
    })
    .required();

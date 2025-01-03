
import Joi from "joi";
import { generalFields } from "../../middleWare/validation.middleware.js";




export const signup = Joi.object()
  .keys({
    userName: generalFields.userName.required(),
    email: generalFields.email.required(),
    password: generalFields.password.required(),
    confirmationPassword: generalFields.confirmationPassword.valid(Joi.ref("password")).required(),
    phone: generalFields.phone,
    gender: generalFields.gender,
    role: generalFields.role,
    acceptLanguage: generalFields.acceptLanguage, //from headers
  })
  .options({
    allowUnknown: false, //very dangerous at assign true be carful
  })
  .required();




  export const login = Joi.object()
    .keys({
      email: generalFields.email.required(),
      password: generalFields.password.required(),
    })
    .options({
      allowUnknown: false, //very dangerous at assign true be carful
    })
    .required();

  










export const signup_customize = {
  body: Joi.object().keys({
    // userName: Joi.string().min(2).max(40).empty("").default("user empty"),
    userName: Joi.string().min(2).max(40).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        maxDomainSegments: 2,
        tlds: { allow: ["com", "net", "edu"] }, //top limit domains tlds
      })
      .required()
      .messages({
        "string.email": "Invalid email address",
      }),
    password: Joi.string()
      .pattern(
        new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
      )
      .required(),
    confirmationPassword: Joi.string().valid(Joi.ref("password")).required(),
    phone: Joi.string().pattern(new RegExp(/^(\+2|002)?01[0125]{1}[0-9]{8}$/)),
    gender: Joi.string().valid("male", "female"),
    role: Joi.string().valid("user", "admin", "hr"),

    // flag: Joi.boolean().sensitive(true).falsy(0).truthy(1),
    // age: Joi.number().positive().min(16).max(120),
    // skills: Joi.array().items(Joi.string()).min(1).max(5),
    // DOB:
    // Joi.date().less('now')
    }
  ).options({
    allowUnknown: false,  //very dangerous at assign true be carful
  }).required(),
  
  query:Joi.object().keys({
    // userName: Joi.string().min(2).max(40).empty("").default("user empty"),
    lang: Joi.string().valid("en","ar").default("en").required(),
   
    }
  ).required()
}










/*
regex for ip 
/^([0-9]\.|[0-9][0-9]\.|((1[0-9][0-9])|200|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[0-9][0-9]|((1[0-9][0-9])|200|2[0-4][0-9]|25[0-5]))$/gm
*/
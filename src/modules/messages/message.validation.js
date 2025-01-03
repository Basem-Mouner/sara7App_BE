import Joi from "joi";
import { generalFields } from "../../middleWare/validation.middleware.js";

export const sendMessage = Joi.object()
  .keys({
    message: generalFields.message.required(),
    recipientId: generalFields.id.required(),
  })
  .required();

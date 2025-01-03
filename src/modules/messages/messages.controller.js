import { Router } from "express";
const router = Router();

import * as messagesServices from "./service/messages.services.js";
import { validation } from "../../middleWare/validation.middleware.js";
import * as validator from "./message.validation.js"

router.post("/", validation(validator.sendMessage), messagesServices.sendMessage);


//________________________________
export default router;

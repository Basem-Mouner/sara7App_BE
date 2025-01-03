import { Router } from "express";
const router = Router();

import * as authServices from"./service/registration.service.js";
import * as loginServices from "./service/login.service.js";
import * as validators from "./auth.validation.js";
import { validation } from "../../middleWare/validation.middleware.js";



router.post("/signup", validation(validators.signup), authServices.signup);  
router.patch("/confirmEmail", authServices.confirmEmail);    
router.post("/login", loginServices.login);    

//________________________________
export default router

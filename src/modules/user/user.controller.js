import { Router } from "express";
const router = Router();

import * as userProfileServices from "./service/profile.service.js";
import * as validators from "./user.validation.js";
import { endPoint } from "./user.endpoint.js";
import { authentication, authorization } from "../../middleWare/auth.middleware.js";
import { validation } from "../../middleWare/validation.middleware.js";

router.get("/profile",authentication(),authorization(endPoint.profile), userProfileServices.userProfileByToken);
router.patch("/profile",validation(validators.updateProfile),authentication(),authorization(endPoint.profile), userProfileServices.userProfileUpdate);
router.patch("/profile/password", validation(validators.updatePassword), authentication(), authorization(endPoint.profile), userProfileServices.passwordUpdate);
router.patch("/profile/forgetPassword", validation(validators.forgetPassword), userProfileServices.forgetPassword);
router.patch("/profile/resetPassword",validation(validators.resetPassword), userProfileServices.resetPassword);


router.delete("/profile/frizz", authentication(), authorization(endPoint.profile), userProfileServices.frizzAccount);
router.patch("/profile/deFrizz", userProfileServices.deFrizzingAccount);
router.get("/:userId/profile",validation(validators.shareProfile), userProfileServices.shareUserProfile);


//________________________________
export default router;

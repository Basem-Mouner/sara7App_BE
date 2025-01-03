import userModel from "../DB/model/user.model.js";
import { verifyToken } from "../utils/token/token.js";
import { asyncHandler } from "../utils/error/error.handling.js";
import { roleTypes } from "./types/roleTypes.js";

export const authentication = () => {
  return asyncHandler(async (req, res, next) => {
    const { authorization } = req.headers;

    const [Bearer, token] = authorization?.split(" ") || [];
    if (!Bearer || !token) {
      return next(
        new Error("Unauthorized authorization required", { cause: 400 })
      );
    }

    const decodeToken = verifyToken({
      token,
      signature:
        Bearer == roleTypes.admin
          ? process.env.TOKEN_SIGNATURE_Admin
          : process.env.TOKEN_SIGNATURE_User,
    });

    if (!decodeToken?.userId) {
      return next(new Error("IN-Valid token payload", { cause: 400 }));
    }
    const user = await userModel.findById(decodeToken.userId);

    if (!user) {
      return next(new Error("User not found", { cause: 404 }));
    }
   
    
    
    //when changed password token will expired
    if (parseInt((user.changePasswordTime?.getTime()||0)/ 1000) >= decodeToken.iat) {
      return next(new Error("Expired credential Password changed, please login again with new password", { cause: 400 }));
    }


     //when account are frizzing and send redirection email to reconfirm your account
    if ((parseInt((user.lastFrizzTime?.getTime() || 0) / 1000) >= decodeToken.iat) || (user.frizz == true)) {
      return next(new Error("Account is frizzing, please reactivated your account via email", {cause: 400,
      }))
    }

    




    req.user = user; // assign new field (user) in object req to send next pipeline
    return next();
  });
};

export const authorization = (accessRole = []) => {
  return asyncHandler(async (req, res, next) => {
    if (!accessRole.includes(req.user.role)) {
      return new Error("Access denied not authorized", { cause: 403 });
    }

    return next();
  });
};

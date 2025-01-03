import userModel from "../../../DB/model/user.model.js";
import { roleTypes } from "../../../middleWare/types/roleTypes.js";
import { asyncHandler } from "../../../utils/error/error.handling.js";
import { successResponse } from "../../../utils/response/success.response.js";
import { generateToken,  } from "../../../utils/token/token.js";
import { compareHash } from "../../../utils/security/hash.js";
import { emailEvent } from "../../../utils/events/sendEmail.event.js";



export const login = asyncHandler(
    async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email }); //{}  null
  if (!user) {
    return next(new Error("In-Valid Account", { cause: 404 }));
    }
    //when account are frizzing and send redirection email to reconfirm your account
    if (user.frizz) {
      // generate email event to reactivate this account
      // event send email for confirmation this email in signup

        emailEvent.emit("sendEmail", { userName: user.userName, email:user.email });

      return next(new Error("Account is frizzing, please reactivated your account via email", {cause: 400,
      }))
    }



  if (!user.confirmEmail) {
    return next(new Error("Please confirm your email first", { cause: 404 }));
    }
    
    
  if (! compareHash(password, user.password)) {
    return next(new Error("Invalid Password", { cause: 401 }));
  }
  //________________
  
 
  const token = generateToken({
    payload: { userId: user._id, isLogged: true },
    signature:
      user.role == roleTypes.admin
        ? process.env.TOKEN_SIGNATURE_Admin
        : process.env.TOKEN_SIGNATURE_User, //pathAlgorithm,
    options: { expiresIn: "1h" },
  });
  //___________________
  
  return successResponse({
    res,
    message: "done login",
    data: { token },
    status: 200,
  });
});

import messageModel from "../../../DB/model/message.model.js";
import userModel from "../../../DB/model/user.model.js";
import { asyncHandler } from "../../../utils/error/error.handling.js"
import { successResponse } from "../../../utils/response/success.response.js";


export const sendMessage = asyncHandler(
    async (req, res, next) => {
    const { message, recipientId } = req.body;
    const user = await userModel.findOne({ _id: recipientId, frizz: false });
    if (!user) { 
      return next(new Error("in-valid recipient",{cause:404}));
    }

    const newMessage = await messageModel.create({ message, recipientId });
  

  return successResponse({
    res,
    message: "done created new message",
    status: 201,
    data: { newMessage },
  });
});
import mongoose, { model, Schema, Types } from "mongoose";

const messageSchema = new Schema(
  {
    message: {
      type: String,
      required: true,
      trim: true,
      minLength: 1,
      maxLength: 50000,
    },
    recipientId: {
      type: Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

const messageModel = mongoose.models.message || model("message", messageSchema);
export default messageModel;

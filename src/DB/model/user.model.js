import mongoose, { model, Schema } from "mongoose";
import { roleTypes } from "../../middleWare/types/roleTypes.js";
import { genderTypes } from "../../middleWare/types/genderTypes.js";

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: [true, "Please enter your name"],
      minLength: 2,
      maxLength: 20,
      validate: {
        validator: function (v) {
          if (v == "admin") {
            return false;
          } else if (v == "ADMIN") {
            throw new Error("ADMIN is not allowed");
          } else {
            return true;
          }
        },
        message: "userName cant be admin",
      },
    },
    email: {
      type: String,
      required: true,
      unique: true, //not validator but its just query helper
    },
    password: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      default: 0,
      min: 0,
      max: [12000, "Must be at greater 12000, got {VALUE}"],
    },
    gender: {
      type: String,
      enum: Object.values(genderTypes),
      default: genderTypes.male,
    },
    role: {
      type: String,
      enum: Object.values(roleTypes),
      default: roleTypes.user,
    },
    confirmEmail: {
      type: Boolean,
      default: false,
    },
    frizz: {
      type: Boolean,
      default: false,
    },
    phone: String,
    image: String,
    DOB: Date,
    changePasswordTime: Date,
    lastFrizzTime: Date,
    otp: { type: String },
    otpExpires: { type: Date },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.models.user|| model("user", userSchema);
export default userModel;


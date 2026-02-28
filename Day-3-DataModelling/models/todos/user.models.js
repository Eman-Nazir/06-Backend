import monngoose from "mongoose";
const UserSchema = new monngoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "password is required "],
    },
  },
  {
    timestamps: true,
  },
);
export const User = monngoose.model("User", UserSchema);

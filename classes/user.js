import mongoose, { Schema } from "mongoose";
import UserDetail from "./userDetail";

const userSchema = new Schema(
  {
    email: String,
    password: String,
    details: UserDetail,
  },
)

const User = mongoose.model.User || mongoose.model("User", userSchema);

export default User
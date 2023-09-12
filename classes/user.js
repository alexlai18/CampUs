import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    email: String,
    password: String,
    details: [{type: Schema.ObjectId, ref: 'UserDetail'}],
    friends: [{type: String}]
  },
)

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
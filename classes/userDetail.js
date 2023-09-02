import mongoose, { Schema } from "mongoose";

const userDetailSchema = new Schema(
  {
    fname: String,
    lname: String,
    fullName: String,
    grade: Number,
    uni: String,
    currentGroups: [
      {
        course: String,
        name: String
      }
    ],
    pastGroups: [
      {
        course: String,
        name: String
      }
    ]
  },
)

const UserDetail = mongoose.models.UserDetail || mongoose.model("UserDetail", userDetailSchema);

export default UserDetail;
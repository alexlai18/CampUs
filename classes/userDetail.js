import mongoose, { Schema } from "mongoose";

const userDetailSchema = new Schema(
  {
    fname: String,
    lname: String,
    fullName: String,
    grade: Number,
    about: String,
    uni: String,
    currentGroups: [{type: Schema.ObjectId, ref: 'Group'}],
    pastGroups: [{type: Schema.ObjectId, ref: 'Group'}]
  },
)

const UserDetail = mongoose.models.UserDetail || mongoose.model("UserDetail", userDetailSchema);

export default UserDetail;
import mongoose, { Schema } from "mongoose";

const groupSchema = new Schema(
  {
    user: mongoose.Schema.Types.ObjectId, // This relates to id of User
    name: String,
    email: String,
    course: String, // Relates to course code
    initials: String,
    ratingGiven: Number,
  },
)

const GroupMate = mongoose.models.GroupMate || mongoose.model("GroupMate", groupSchema);

export default GroupMate;
import mongoose, { Schema } from "mongoose";

const notifSchema = new Schema(
  {
    receiver: String,
    sender: String,
    action: String,
    message: String,
  },
)

const Notifications = mongoose.models.Notifications || mongoose.model("Notifications", notifSchema);

export default Notifications;
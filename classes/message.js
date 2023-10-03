import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema(
  {
    sender: {type: Schema.ObjectId, ref: 'User'},
    content: String,
    timestamps: {
      createdAt: Date,
      updatedAt: Date
    }
  },
)

const Message = mongoose.models.Message || mongoose.model("Message", messageSchema);

export default Message;
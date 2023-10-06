import mongoose, { Schema } from "mongoose";

const groupSchema = new Schema(
  {
    name: String,
    courseCode: String,
    members: [{type: Schema.ObjectId, ref: 'User'}],
    target: {
      type: String,
      validate: {
        validator: function(v) {
          return ["PS", "CR", "D", "HD"].includes(v);
        },
        message: props => `${props.value} is not a valid grade`
      },
    },
    messages:[{type: Schema.ObjectId, ref: 'Message'}]
  },
)

const Group = mongoose.models.Group || mongoose.model("Group", groupSchema);

export default Group;
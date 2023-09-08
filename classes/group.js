import mongoose, { Schema } from "mongoose";

const groupSchema = new Schema(
  {
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
  },
)

const Group = mongoose.models.Group || mongoose.model("Group", groupSchema);

export default Group;
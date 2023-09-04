import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema(
  {
    code: String,
    perGroup: Number,
  },
)

const Course = mongoose.models.Course || mongoose.model("Course", courseSchema);

export default Course;
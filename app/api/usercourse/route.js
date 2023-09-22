import Course from "@/classes/course";
import User from "@/classes/user";
import UserDetail from "@/classes/userDetail";
import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function PUT (request) {
  // Add course to a user
  const { id, courseCode, isJoining } = await request.json();
  await connectMongoDB();
  
  const user = await User.findById(id);
  if (!user) {
    return NextResponse.json({message: "User doesn't exist"}, {status: 404});
  }

  const detailId = user.details[0];
  const userDetails = await UserDetail.findById(detailId);
  const currentCourses = userDetails.currentCourses;

  const course = await Course.findOne({code: courseCode});
  const courseId = course._id;

  if (!courseId) {
    return NextResponse.json({message: "Course doesn't exist"}, {status: 404});
  }

  if (!currentCourses) {
    if (!isJoining) {
      return NextResponse.json({message: "Course not joined previously"}, {status: 400});
    } else {
      await UserDetail.findByIdAndUpdate(detailId,
        {
          currentCourses: [courseId],
        }
      );
      return NextResponse.json({message: "User Joined Course"}, {status: 200});
    }
  } else {
    if (isJoining) {
      const newCourses = currentCourses;
      if (newCourses.includes(courseId)) {
        return NextResponse.json({message: "You're already in the course"}, {status: 400});
      }
      newCourses.push(courseId);
      await UserDetail.findByIdAndUpdate(detailId,
        {
          currentCourses: newCourses
        }
      );
    } else {
      const newCourses = currentCourses;
      if (!newCourses.includes(courseId)) {
        return NextResponse.json({message: "Course not joined previously"}, {status: 400});
      } else {
        newCourses.remove(courseId);
        await UserDetail.findByIdAndUpdate(detailId,
          {
            currentCourses: newCourses
          }
        );
      }
    }
    return NextResponse.json({message: "User Joined Course"}, {status: 200});
  }
}
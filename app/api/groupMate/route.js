import GroupMate from "@/classes/groupMate";
import User from "@/classes/user";
import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";

// Creating a new course in the MongoDB database
export async function POST(request) {
  const { user, name, email, course, initials, ratingGiven } = await request.json();
  await connectMongoDB();

  if (!User.findById(user)) {
    return NextResponse.json({message: "This user does not exist"}, {status: 404})
  }

  await GroupMate.create(
    {
      user,
      name,
      email,
      course,
      initials,
      ratingGiven
    }
  );
  return NextResponse.json({message: "Groupmate Added"}, {status: 200})
}

// Get either all group mates in the database
export async function GET() {
  await connectMongoDB();
  const gmate = await GroupMate.find();

  if (!gmate || gmate.length === 0) {
    return NextResponse.json({message: "There are no group mates in the database"}, { status: 404 });
  }

  return NextResponse.json(courses, { status: 200 });
}
import User from "@/classes/user";
import UserDetail from "@/classes/userDetail";
import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";

// As UserDetail is a subdocument of User, we only need to update User to update UserDetail as well

export async function POST(request) {
  const { email, password } = await request.json();
  await connectMongoDB();

  if (User.findOne({email: email})) {
    return NextResponse.json({message: "The email has already been registered. Please log in."}, {status: 400})
  }

  await User.create(
    {
      email,
      password,
      details: await UserDetail.create(),
    }
  );
  return NextResponse.json({message: "User Registered"}, {status: 200})
}

// Get either all users in database, or specific user
export async function GET() {
  await connectMongoDB();
  const users = await User.find();

  if (!users || users.length === 0) {
    return NextResponse.json({message: "There are no users in the database"}, { status: 404 });
  }

  return NextResponse.json(users, { status: 200 });
}
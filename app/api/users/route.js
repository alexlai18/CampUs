import User from "@/classes/user";
import UserDetail from "@/classes/userDetail";
import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";

// As UserDetail is a subdocument of User, we only need to update User to update UserDetail as well

export async function POST(request) {
  const { email, password } = await request.json();
  await connectMongoDB();
  await User.create(
    {
      email,
      password,
      details: await UserDetail.create(),
    }
  );
  return NextResponse.json({message: "User Registered"}, {status: 200})
}

// Get all users in the database
export async function GET() {
  await connectMongoDB();
  const users = await User.find();
  return NextResponse.json(users, { status: 200 });
}

export async function DELETE(request) {
  const { id } = await request.json();
  await connectMongoDB();
  await User.findByIdAndDelete(id);
  return NextResponse.json({message: "User Deleted"}, {status: 200})
}

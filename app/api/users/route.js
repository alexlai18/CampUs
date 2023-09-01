import User from "@/classes/user";
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
      details: {},
    }
  );
  return NextResponse.json({message: "User Registered"}, {status: 200})
}

export async function GET() {
  await connectMongoDB();
  const user = await User.find();
  return NextResponse.json({ user });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await User.findByIdAndDelete(id);
  return NextResponse.json({message: "User Deleted"}, {status: 200})
}

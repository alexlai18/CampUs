import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import User from "@/classes/user";

// Route for dynamic requests where the id field changes
export async function PUT(request, {params}) {
  const { id } = params;
  const { newEmail: email, newPassword: password, newDetails: details } = await request.json();
  await connectMongoDB();
  await User.findByIdAndUpdate(id, {email, password, details});
  return NextResponse.json({ message: "User updated" }, { status: 200 })
}

// Get specific user from the database
export async function GET(request, {params}) {
  const { id } = params;
  await connectMongoDB();
  const user = await User.findOne({_id: id});
  return NextResponse.json({ user }), { status: 200 };
}
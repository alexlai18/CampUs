import User from "@/classes/user";
import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { email, password } = await request.json();
  await connectMongoDB();
  await User.create({email, password});
  return NextResponse.json({message: "User Registered"}, {status: 200})
}
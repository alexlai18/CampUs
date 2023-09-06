import User from "@/classes/user";
import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";

// Get either all users in database, or specific user
export async function GET(request) {
  const search = new URL(request.url).searchParams;
  await connectMongoDB();
  const users = await User.find({$and: [{email: search.get("email")}, {password: search.get("password")}]});

  if (!users) {
    return NextResponse.json({message: "Either the email or password is incorrect"}, { status: 404 });
  }

  return NextResponse.json(users, { status: 200 });
}
import UserDetail from "@/classes/userDetail";
import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";

// Get either all users in database, or specific user
export async function GET(request) {
  const search = new URL(request.url).searchParams;
  await connectMongoDB();
  const info = await UserDetail.findById(search.get("id"));
  if (!info === 0) {
    return NextResponse.json({message: "Either the email or password is incorrect"}, { status: 404 });
  }

  return NextResponse.json(info, { status: 200 });
}
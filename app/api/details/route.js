import UserDetail from "@/classes/userDetail";
import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";

// Get the details of a user given the id of the UserDetail document
export async function GET(request) {
  const search = new URL(request.url).searchParams;
  await connectMongoDB();
  const info = await UserDetail.findById(search.get("id"));
  if (!info === 0) {
    return NextResponse.json({message: "There is no UserDetail document corresponding to id"}, { status: 404 });
  }

  return NextResponse.json(info, { status: 200 });
}
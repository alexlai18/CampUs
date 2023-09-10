import User from "@/classes/user";
import UserDetail from "@/classes/userDetail";
import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";

// As UserDetail is a subdocument of User, we only need to update User to update UserDetail as well

export async function POST(request) {
  const { email, password } = await request.json();

  await connectMongoDB();

  const found = await User.findOne({email: email});
  if (found) {
    return NextResponse.json({message: "The email has already been registered. Please log in."}, {status: 400})
  }

  const user = await User.create(
    {
      email,
      password,
      details: await UserDetail.create(),
      friends: []
    }
  );

  return NextResponse.json(user, {status: 200})
}

// Get either all users in database, or specific user
export async function GET(request) {
  const search = new URL(request.url).searchParams;
  const email = search.get("email");
  await connectMongoDB();

  if (email) {
    const user = await User.findOne({email: email});
    if (!user || user.length === 0) {
      return NextResponse.json({message: "This user does not exist in the database"}, { status: 404 });
    }
  
    return NextResponse.json(user, { status: 200 });
  } else {
    const users = await User.find();

    if (!users || users.length === 0) {
      return NextResponse.json({message: "There are no users in the database"}, { status: 404 });
    }
  
    return NextResponse.json(users, { status: 200 });
  }
}
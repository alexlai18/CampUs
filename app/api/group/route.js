import Group from "@/classes/group";
import Course from "@/classes/course";
import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import User from "@/classes/user";

// Creating a new group in the MongoDB database
export async function POST(request) {
  const { courseCode, members, target } = await request.json();
  await connectMongoDB();
  const course = await Course.findOne({code: courseCode});

  if (course === undefined) {
    return NextResponse.json({message: "This course does not exist"}, {status: 400})
  }

  const memberList = []
  
  async function getMembers() {
    await Promise.all (
      members.map(async (m) => {
        const user = await User.findOne({email: m});
        memberList.push(user._id);
      })
    );
  };
  await getMembers();
  await Group.create(
    {
      courseCode,
      members: memberList,
      target
    }
  );
  return NextResponse.json({message: "Course Added"}, {status: 200})
}

// Get group from the database
export async function GET(request) {
  const search = new URL(request.url).searchParams;
  await connectMongoDB();
  const id = search.get("id");
  const res = Group.findById(id);

  return NextResponse.json(res, { status: 200 });
}

// Get either courses in the database
export async function PUT(request, {params}) {
  const { id } = params;
  const { courseCode, members, target } = await request.json();
  await connectMongoDB();
  const group = Group.findById(id);
  const res = Group.findByIdAndUpdate(
    {
      courseCode: courseCode || group.courseCode,
      members: members || group.members,
      target: target || group.target,
    }
  )

  return NextResponse.json(res, { status: 200 });
}

// Delete group from the database
export async function DELETE(request) {
  const { id } = await request.json();
  await connectMongoDB();
  Group.findByIdAndDelete(id);

  return NextResponse.json({message: "This group has been deleted"}, { status: 200 });
}
  
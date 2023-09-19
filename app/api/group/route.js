import Group from "@/classes/group";
import Course from "@/classes/course";
import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import User from "@/classes/user";

// Creating a new group in the MongoDB database
export async function POST(request) {
  const { name, courseCode, members, target } = await request.json();
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
  const group = await Group.create(
    {
      name,
      courseCode,
      members: memberList,
      target
    }
  );
  return NextResponse.json(group, {status: 200})
}

// Get group from the database
export async function GET(request) {
  const search = new URL(request.url).searchParams;
  await connectMongoDB();
  const course = search.get("course");
  const filter = search.get("prefix");
  const id = search.get("id");
  if (course) {
    const groups = await Group.find({courseCode: course});
    const res = [];
    groups.map((g) => {
      if ((g.name.toLowerCase()).includes(filter.toLowerCase())) {
        res.push(g);
      }
    });
    return NextResponse.json(res, { status: 200 });
  } else if (id) {
    const res = await Group.findById(id);
    return NextResponse.json(res, { status: 200 });
  } else if (filter !== null) {
    const groups = await Group.find();
    const res = [];
    groups.map((g) => {
      if ((g.name.toLowerCase()).includes(filter.toLowerCase())) {
        res.push(g);
      }
    });
    const sortedCourses = res.sort((a, b) => {
      const idxA = a.name.toLowerCase().indexOf(filter.toLowerCase());
      const idxB = b.name.toLowerCase().indexOf(filter.toLowerCase());
  
      if (idxA === idxB) {
        return a.name.toLowerCase().split(filter.toLowerCase()).length - 1 > b.name.toLowerCase().split(filter.toLowerCase()).length - 1
      }
      return idxA - idxB;
    });
    return NextResponse.json(sortedCourses, { status: 200 });
  }

  return NextResponse.json({message: "Invalid Request"}, { status: 400 });
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
  
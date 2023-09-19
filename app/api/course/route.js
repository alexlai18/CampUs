import Course from "@/classes/course";
import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";

// Creating a new course in the MongoDB database
export async function POST(request) {
  const { code, perGroup } = await request.json();
  await connectMongoDB();

  if (await Course.findOne({code: code})) {
    return NextResponse.json({message: "This course has been identified previously, you can find it in courses!"}, {status: 400})
  }

  await Course.create(
    {
      code,
      perGroup,
    }
  );
  return NextResponse.json({message: "Course Added"}, {status: 200})
}

// Get either courses in the database
export async function GET(request) {
  const search = new URL(request.url).searchParams;
  await connectMongoDB();
  const filter = search.get("prefix");

  const courses = await Course.find();

  if (!courses || courses.length === 0) {
    return NextResponse.json({message: "There are no courses in the database"}, { status: 404 });
  }

  const res = [];
  courses.map((course) => {
    if ((course.code.toLowerCase()).includes(filter.toLowerCase())) {
      res.push(course);
    }
  });

  const sortedCourses = res.sort((a, b) => {
    const idxA = a.code.toLowerCase().indexOf(filter.toLowerCase());
    const idxB = b.code.toLowerCase().indexOf(filter.toLowerCase());

    if (idxA === idxB) {
      return a.code.toLowerCase().split(filter.toLowerCase()).length - 1 > b.code.toLowerCase().split(filter.toLowerCase()).length - 1
    }
    return idxA - idxB;
  });

  return NextResponse.json(sortedCourses, { status: 200 });
}

// Can't change course code ever
export async function PUT(request) {
  const { code, perGroup } = await request.json();
  await connectMongoDB();

  const course = await Course.findOne({code: code});

  if (!course) {
    return NextResponse.json({ message: "Course doesn't exist" }, { status: 404 });
  }

  if (course.perGroup === perGroup) {
    return NextResponse.json({ message: "You're not making any changes" }, { status: 400 });
  }

  Course.findOneAndUpdate({code: code},
    {
      perGroup: perGroup
    }
  );
}

export async function DELETE(request) {
  const { code } = await request.json();
  await connectMongoDB();
  await Course.findOneAndDelete({code: code});
  return NextResponse.json({message: "Course Deleted"}, {status: 200})
}

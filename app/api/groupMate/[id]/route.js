import GroupMate from "@/classes/groupMate";
import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";

// Get specific groupmate from the database
export async function GET(request, {params}) {
  const { id } = params;
  await connectMongoDB();
  const gmate = await GroupMate.findOne({_id: id});

  if (!gmate) {
    return NextResponse.json({message: "This groupmate does not exist in the database"}, { status: 404 });
  }

  return NextResponse.json({ gmate }, { status: 200 });
}

// Update specific groupmate
export async function PUT(request, {params}) {
  const { id } = params;
  const { user, name, email, course, initials, ratingGiven } = await request.json();
  await connectMongoDB();
  const gmate = await GroupMate.findOne({_id: id});

  if (!gmate) {
    return NextResponse.json({message: "This groupmate does not exist in the database"}, { status: 404 });
  } else {
    await GroupMate.findByIdAndUpdate(detailId,
      {
        user: user || gmate.user,
        name: name || gmate.name,
        email: email || gmate.email,
        course: course || gmate.course,
        initials: initials || gmate.initials,
        ratingGiven: ratingGiven || gmate.ratingGiven,
     }
    )
  }

  return NextResponse.json({ message: "GroupMate updated" }, { status: 200 });
}

// Delete specific groupmate
export async function DELETE(request, {params}) {
  const { id } = params;
  await connectMongoDB();
  await GroupMate.findByIdAndDelete(id);
  return NextResponse.json({message: "GroupMate Deleted"}, {status: 200})
}
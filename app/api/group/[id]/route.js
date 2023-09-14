import Group from "@/classes/group";
import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function PUT(request, {params}) {
  const { id } = params;
  const { userId } = await request.json();
  await connectMongoDB();
  const group = await Group.findById(id);
  const members = group.members;
  if (!members.includes(userId)) {
    members.push(userId);
    await Group.findByIdAndUpdate(id, {
      members: members
    })
    return NextResponse.json({message: "This user has been added to the group"}, { status: 200 });
  } else {
    return NextResponse.json({message: "This user is already in the group"}, { status: 400 });
  }
}

// Delete member from the group
export async function DELETE(request, {params}) {
  const { id } = params;
  const { userId } = await request.json();
  await connectMongoDB();

  const group = await Group.findById(id);
  const members = group.members;
  if (members.includes(userId)) {
    members.remove(userId);
    await Group.findByIdAndUpdate(id, {
      members: members
    })
    return NextResponse.json({message: "This group has been deleted"}, { status: 200 });
  } else {
    return NextResponse.json({message: "This user is not a part of the group"}, { status: 400 });
  }
}
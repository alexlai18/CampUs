import Group from "@/classes/group";
import Message from "@/classes/message";
import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";

// Get either all messages given groupId
export async function GET(request) {
  const search = new URL(request.url).searchParams;
  await connectMongoDB();
  const group = await Group.findOne({_id: search.get("groupId")}).lean();
  
  if (!group) {
    return NextResponse.json({message: "This group does not exist"}, { status: 404 });
  }

  const messages = group.messages;
  const res = [];

  await Promise.all(
    messages.map(async (m) => {
      res.push(await Message.findById(m));
    })
  )
  res.sort((a, b) => a.timestamps.createdAt - b.timestamps.createdAt);
  return NextResponse.json(res, { status: 200 });
}

// Create new message
export async function POST(request) {
  const { sender, content, timestamps, groupId } = await request.json();
  await connectMongoDB();

  const group = await Group.findOne({_id: groupId}).lean();
  const message = await Message.create({
    sender: sender,
    content: content,
    timestamps: timestamps
  });
  const groupMsg = group.messages || [];
  groupMsg.push(message._id);
  await Group.findByIdAndUpdate(groupId,
    {
      messages: groupMsg
    },
  );
  return NextResponse.json(message, {status: 200});
}

// Edit a message
export async function PUT(request) {
  const search = new URL(request.url).searchParams;
  const { body } = await request.json();
  await connectMongoDB();

  await Message.findByIdAndUpdate(search.get("messageId"),
    body
  );

  return NextResponse.json("Message has been edited", {status: 200});
}

// Delete a message
export async function DELETE(request) {
  const { messageId, groupId } = await request.json();
  await connectMongoDB();
  const group = await Group.findById(groupId);
  const groupMsg = group.messages;
  groupMsg.remove(messageId);

  await Group.findByIdAndUpdate(groupId,
    {
      messages: groupMsg
    }
  );

  await Message.findByIdAndDelete(messageId);
  return NextResponse.json("Message has been removed", {status: 200});
}
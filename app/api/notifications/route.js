import Notifications from "@/classes/notifications";
import User from "@/classes/user";
import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";

// This creates a new notification (should be sent with every message or ping action)
export async function POST(request) {
  const { receiver, sender, action, message } = await request.json();
  await connectMongoDB();

  await Notifications.create(
    {
      receiver,
      sender,
      action,
      message,
    }
  );
  return NextResponse.json({message: "Notification sent"}, {status: 200});
}

export async function GET(request) {
  const search = new URL(request.url).searchParams;
  const receiver = search.get("receiver");

  // Collect all notifications in database
  if (!receiver) {
    const notifs = await Notifications.find();
    return NextResponse.json(notifs, {status: 200});
  } else {
    const user = await User.find({email: receiver})
    if (!user) {
      return NextResponse.json({message: "This user does not exist"}, {status: 404});
    }
    const notifs = await Notifications.find({receiver: receiver});
    return NextResponse.json(notifs, {status: 200});
  }
}

export async function DELETE(request) {
  const { receiver, notifId } = await request.json();

  // Either user was deleted or they wanted to clear/delete all their notifs
  if (receiver) {
    const deleted = await Notifications.deleteMany({receiver: receiver});
    return NextResponse.json({message: `Deleted ${deleted} number of notifications`}, {status: 200});
  }
  
  if (notifId) {
    await Notifications.findOneAndDelete({_id: notifId});
    return NextResponse.json({message: `Deleted notification ${notifId}`}, {status: 200});
  }
}
import User from "@/classes/user";
import UserDetail from "@/classes/userDetail";
import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";

// Get list of friends for a user given search filter
export async function GET(request) {
  const search = new URL(request.url).searchParams;
  const email = search.get("email");
  const prefix = search.get("prefix");
  await connectMongoDB();

  const user = await User.findOne({email: email});

  if (!user) {
    return NextResponse.json({message: "This user does not exist in the database"}, { status: 404 });
  }
  const friends = user.friends;

  if (!friends || friends.length === 0) {
    return NextResponse.json([], { status: 200 });
  }

  const res = [];
  async function getFriends() {
    await Promise.all(
      friends.map(async (friend) => {
        if ((friend.toLowerCase()).includes(prefix.toLowerCase())) {
          // Get user details
          const friendUser = await User.findOne({email: friend});
          const detailId = friendUser.details[0];
          const details = await UserDetail.findById(detailId).lean();
          if (details) {
            details.email = friend;
            res.push(details);
          }
        }
        }
      )
    );
  }
  await getFriends();
  return NextResponse.json(res, { status: 200 });
}

// THE ACCOUNT THAT IS LOGGED IN SHOULD USE THEIR ID (userId in store)
// THE ACCOUNT BEING ADDED TO THE CONNECTIONS SHOULD BE EMAIL

// Adding email of user to the list of friends
export async function PUT(request) {
  const { id, email } = await request.json();
  await connectMongoDB();

  const sender = await User.findById(id);
  const receiver = await User.findOne({email: email})

  if (!receiver) {
    return NextResponse.json({message: "The user you're trying to add does not exist."}, {status: 400})
  }

  if (!receiver.friends)  {
    await User.updateOne({email: email},
      {
        friends: [sender.email]
      }
    )
    return NextResponse.json({message: "Friend Added"}, {status: 200});
  }

  if (receiver.friends.includes(sender.email)) {
    return NextResponse.json({message: "You're already friends with this user"}, {status: 400})
  }

  const updatedList = receiver.friends;
  updatedList.push(sender.email);

  await User.findOneAndUpdate({email: email},
    {
      friends: updatedList
    }
  )
  return NextResponse.json({message: "Friend Added"}, {status: 200});
}

// Delete friend from a user
export async function DELETE(request) {
  const { id, email } = await request.json();
  await connectMongoDB();

  const sender = User.findById(id);
  const receiver = User.find({email: email})

  if (!receiver) {
    return NextResponse.json({message: "The user you're trying to remove does not exist."}, {status: 400})
  }

  if (!receiver.friends.includes(email)) {
    return NextResponse.json({message: "You're not friends with this user"}, {status: 400})
  }

  const updatedList = receiver.friends.remove(sender.email);

  await User.findOneAndUpdate({email: email},
    {
      friends: updatedList
    }
  )
  return NextResponse.json({message: "Friend Removed"}, {status: 200})
}
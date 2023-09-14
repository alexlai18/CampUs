import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import User from "@/classes/user";
import UserDetail from "@/classes/userDetail";

// Route for dynamic requests where the id field changes
// This route contains changing UserDetail schema
export async function PUT(request, {params}) {
  const { id } = params;
  const { email, password, details } = await request.json();
  console.log(details);
  const user = await User.findOne({_id: id});

  // Checking if user exists
  if (!user) {
    return NextResponse.json({ message: "User doesn't exist" }, { status: 404 });
  }

  // Getting the id of the UserDetail document
  const detailId = user.details;
  const newEmail = email || user.email;
  const newPassword = password || user.password;

  await connectMongoDB();

  // Checking if they have a UserDetail document, if so, udpate the document. If not, create a new one
  if (detailId) {
    const detailInfo = await UserDetail.findOne({_id: detailId[0]});
    console.log(details.about || detailInfo.about);
    await UserDetail.findByIdAndUpdate(detailId[0],
      {
        fname: details.fname || detailInfo.fname,
        lname: details.lname || detailInfo.lname,
        grade: details.grade || detailInfo.grade,
        about: details.about || detailInfo.about,
        uni: details.uni || detailInfo.uni,
        currentGroups: details.currentGroups || detailInfo.currentGroups,
        pastGroups: details.pastGroups || detailInfo.pastGroups,
     }
    )
    const res = await UserDetail.findById(detailId[0]);
    await User.findByIdAndUpdate(id,
      {
        email: newEmail,
        password: newPassword,
      }
    );
    console.log(res);
    return NextResponse.json(res, { status: 200 });
  } else {
    const detailInfo = await UserDetail.create(
      {
        fname: details.fname,
        lname: details.lname,
        grade: details.grade,
        about: details.about,
        uni: details.uni,
        currentGroups: details.currentGroups,
        pastGroups: details.pastGroups,
      }
    )
    await User.findByIdAndUpdate(id, 
      {
        email: newEmail,
        password: newPassword,
        details: detailInfo
      }
    );
    return NextResponse.json(detailInfo, { status: 200 });
  }
}

// Get specific user from the database
export async function GET(request, {params}) {
  const { id } = params;
  const { email } = request;

  await connectMongoDB();

  let user;
  if (!id) {
    user = await User.findOne({email: email});
  } else {
    user = await User.findOne({_id: id});
  }

  if (!user) {
    return NextResponse.json({message: "This user does not exist in the database"}, { status: 404 });
  }

  return NextResponse.json(user, { status: 200 });
}

// Delete a specific user from the database
export async function DELETE(request, {params}) {
  const { id } = params;
  await connectMongoDB();
  await User.findByIdAndDelete(id);
  return NextResponse.json({message: "User Deleted"}, {status: 200})
}

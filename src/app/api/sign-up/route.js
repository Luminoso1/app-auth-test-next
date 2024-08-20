import { connection } from "@/db/config";
import User from "@/models/user";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

connection();

export async function POST(request) {
  new Promise((resolve) => setTimeout(resolve, 2000));

  // console.log(request);

  try {
    const requestBody = await request.json();
    const { username, email, password } = requestBody;
    console.log("request body: ", requestBody);

    // user exists?
    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "User already exist" },
        { status: 400 }
      );
    }

    // encrypt password
    const salt = await bcryptjs.genSalt(10);
    const hash = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hash,
    });

    const savedUser = await newUser.save();

    return NextResponse.json({
      message: "user created successfully",
      sucess: true,
      savedUser,
    });
  } catch (error) {
    console.error("Error: ", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

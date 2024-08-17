import { connection } from "@/db/config";
import User from "@/models/user";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connection();

export async function POST(request) {
  new Promise((resolve) => setTimeout(resolve, 2000));

  const requestBody = await request.json();
  const { username, password } = requestBody;

  console.log(requestBody);

  // user exists?
  const user = await User.findOne({ username });
  if (!user) {
    return NextResponse.json({ error: "User does not exist" }, { status: 400 });
  }

  // password is correct
  const isPasswordValid = await bcryptjs.compare(password, user.password);
  if (!isPasswordValid) {
    return NextResponse.json({ error: "Invalid" }, { status: 400 });
  }

  // generate and set token

  const tokenData = {
    id: user._id,
    username: user.username,
    email: user.email,
  };

  const token = await jwt.sign(tokenData, process.env.SECRET_TOKEN, {
    expiresIn: "8h",
  });

  const response = NextResponse.json({
    message: "Sign In Successfull",
    success: true,
  });

  response.cookies.set("session", token, {
    httpOnly: true,
    
  });

  return response;
}

import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/utiles/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const { username, email, password } = await request.json();
    console.log(username, email, password);
    
    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    console.log(newUser);
    
    const savedUser = await newUser.save();
    console.log(savedUser);
    

    await sendEmail({email, emailType: "VERIFY", userId: savedUser._id});

    return NextResponse.json(
      { message: "User created successfully", success: true, savedUser },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

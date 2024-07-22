import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/utiles/getDataFromToken";
import User from "@/models/user.model";
connect();

export async function GET(request: NextRequest) {
  try {
    const userId = getDataFromToken(request);
    const userData = User.findById({ _id: userId }).select("-password");
    return NextResponse.json(
      {
        message: "user data fatched successfully",
        data: userData,
        success: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

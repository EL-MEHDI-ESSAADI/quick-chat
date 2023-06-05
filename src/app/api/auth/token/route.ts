import { getToken } from "next-auth/jwt";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../[...nextauth]/route";
import { NextResponse, NextRequest } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({
      data: {
        error: "You must be signed in to view the protected content on this page.",
      },
    });
  }

  const token = await getToken({ req, secret, raw: true });

  return NextResponse.json({ token });
}

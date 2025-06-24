import { dbConnection } from "@/lib/db/neon";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);
  try {
    const result =
      await dbConnection`SELECT * FROM tasks WHERE user_id = ${session?.user.id}  `;

    return NextResponse.json({ sucess: true, data: result }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const body = await request.json();

  const session = await getServerSession(authOptions);
  const { taskName } = body;

  try {
    const result =
      await dbConnection`INSERT INTO tasks (name, user_id) VALUES (${taskName}, ${session?.user.id})`;

    return NextResponse.json({ success: true, data: result }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

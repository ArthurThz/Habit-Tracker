import { dbConnection } from "@/lib/neon";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await dbConnection`SELECT * FROM tasks `;

    return NextResponse.json({ sucess: true, data: result }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const body = await request.json();

  const { taskName, userId } = body;

  try {
    const result =
      await dbConnection`INSERT INTO tasks (name, user_id) VALUES (${taskName}, ${userId})`;

    return NextResponse.json({ success: true, data: result }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

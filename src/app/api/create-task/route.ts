import { NextResponse } from "next/server";

import { dbConnection } from "@/lib/neon";

export async function POST(request: Request) {
  const body = await request.json();

  const { taskName, userId } = body;

  try {
    const result =
      await dbConnection`INSERT INTO tasks (name, user_id) VALUES (${taskName}, ${userId})`;

    return NextResponse.json({ success: true, data: result });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

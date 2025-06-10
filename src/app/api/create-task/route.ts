import { NextResponse } from "next/server";

import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export async function POST(request: Request) {
  const body = await request.json();

  const { taskName, userId } = body;

  try {
    const result =
      await sql`INSERT INTO tasks (name, user_id) VALUES (${taskName}, ${userId})`;

    return NextResponse.json({ success: true, data: result });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

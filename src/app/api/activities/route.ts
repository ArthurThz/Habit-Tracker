import { NextResponse } from "next/server";
import { dbConnection } from "@/lib/neon";

export async function POST(request: Request) {
  const body = await request.json();

  const { taskId, userId, startTime, finishTime } = body;

  try {
    const result =
      await dbConnection`INSERT INTO activities (task_id, user_id, start_time, finish_time) VALUES (${taskId},${userId},${startTime},${finishTime})`;

    return NextResponse.json({ success: true, data: result }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

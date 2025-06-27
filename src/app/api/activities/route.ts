import { NextResponse } from "next/server";
import { dbConnection } from "@/lib/db/neon";
import { activitySchema } from "@/schemas/activity-schema";
import { HttpError } from "@/types/http-error";

export async function POST(request: Request) {
  const body = await request.json();

  if (!body) {
    throw new HttpError("Request body is required", 400);
  }
  try {
    const parsedBody = activitySchema.safeParse(body);

    if (!parsedBody.success) {
      return NextResponse.json(
        { sucess: false, error: parsedBody.error.flatten() },
        { status: 400 }
      );
    }

    const { finishTime, startTime, taskId, userId } = parsedBody.data;

    const result =
      await dbConnection`INSERT INTO activities (task_id, user_id, start_time, finish_time) VALUES (${taskId},${userId},${startTime},${finishTime})`;

    if (!result) {
      throw new HttpError("Cant save your activity", 400);
    }

    return NextResponse.json({ success: true, data: result }, { status: 201 });
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: error.status }
      );
    }
    return NextResponse.json(
      { success: false, message: "Unexpected server error" },
      { status: 500 }
    );
  }
}

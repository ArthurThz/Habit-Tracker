import { dbConnection } from "@/lib/db/neon";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { HttpError } from "@/types/http-error";
import { createTaskSchema, tasksSchema } from "@/schemas/tasks-schema";

export async function GET() {
  const session = await getServerSession(authOptions);

  try {
    if (!session) {
      throw new HttpError("session not found", 403);
    }
    const rawData =
      await dbConnection`SELECT * FROM tasks WHERE user_id = ${session.user.id}`;

    if (!rawData || rawData.length === 0) {
      throw new HttpError("Tasks data not found!", 404);
    }

    const formatedData = rawData.map((item) => ({
      name: item.name,
      id: item.id,
      userId: Number(item.user_id),
      createdAt: new Date(item.createdat),
    }));

    const parsedData = tasksSchema.safeParse(formatedData);

    if (!parsedData.success) {
      throw new HttpError("Task data format is invalid", 500);
    }

    return NextResponse.json(
      { success: true, data: parsedData },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: error.status }
      );
    }
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  const body = await request.json();

  try {
    if (!session) {
      throw new HttpError("session not found!", 403);
    }

    const parsedBody = createTaskSchema.safeParse(body);

    if (!parsedBody.success) {
      throw new HttpError("Invalid data type", 400);
    }

    const { taskName } = parsedBody.data;

    await dbConnection`INSERT INTO tasks (name, user_id) VALUES (${taskName}, ${session.user.id})`;

    return NextResponse.json(
      { success: true, message: "Task successfully created" },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    if (err instanceof HttpError) {
      return NextResponse.json(
        { success: false, message: err.message },
        { status: err.status }
      );
    }
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { findTaskById } from "@/lib/db/findTaskById";
import { deleteTask } from "@/lib/db/deleteTask";
import { HttpError } from "@/types/http-error";
import { taskSchema } from "@/schemas/tasks-schema";

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const id = context.params.id;
  if (!id) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  try {
    const rawData = await findTaskById(id);

    if (!rawData || rawData.length === 0) {
      throw new HttpError("Task data not found", 404);
    }

    const data = rawData[0];

    const formatedData = {
      name: data.name,
      id: data.id,
      userId: Number(data.user_id),
      createdAt: new Date(data.createdat),
    };

    const parsedData = taskSchema.safeParse(formatedData);

    if (!parsedData.success) {
      throw new HttpError("Invalid task data format", 500);
    }

    return NextResponse.json(
      { success: true, data: parsedData.data },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: error.status }
      );
    }
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new HttpError("No session found", 403);
  }

  const taskId = context.params.id;
  const userId = session.user.id;

  try {
    const taskByIdResult = await findTaskById(taskId);
    const task = taskByIdResult[0];

    if (!task) {
      throw new HttpError("Task not found", 404);
    }

    if (task.user_id !== userId) {
      throw new HttpError("Forbidden", 403);
    }

    await deleteTask(taskId);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    if (error instanceof HttpError) {
      console.error(error);
      return NextResponse.json(
        { success: false, message: error.message },
        { status: error.status }
      );
    }
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

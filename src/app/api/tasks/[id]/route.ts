import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { findTaskById } from "@/lib/db/findTaskById";
import { deleteTask } from "@/lib/db/deleteTask";
import { HttpError } from "@/types/http-error";
import { taskByIdSchema } from "@/schemas/tasks-schema";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.pathname.split("/").pop();
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

    const parsedData = taskByIdSchema.parse(formatedData);

    return NextResponse.json(
      { sucess: true, data: parsedData },
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
  context: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new HttpError("Unauthorized", 401);
  }

  const { id: taskId } = await context.params;
  // const taskId = context.params.id;
  const userId = session.user.id;
  const taskByIdResult = await findTaskById(taskId);
  const task = taskByIdResult[0];

  if (!taskId) {
    throw new HttpError("Task id is missing", 400);
  }

  try {
    if (!task) {
      throw new HttpError("Task not found", 404);
    }

    if (task.user_id !== userId) {
      throw new HttpError("Forbidden", 403);
    }

    await deleteTask(taskId);

    return NextResponse.json({ sucess: true }, { status: 200 });
  } catch (error) {
    if (error instanceof HttpError) {
      console.log(error);
      return NextResponse.json(
        { sucess: false, message: error.message },
        { status: error.status }
      );
    }
    return NextResponse.json(
      { sucess: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

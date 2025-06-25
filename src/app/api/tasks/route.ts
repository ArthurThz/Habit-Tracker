import { dbConnection } from "@/lib/db/neon";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { HttpError } from "@/types/http-error";
import { tasksSchema } from "@/schemas/tasks-schema";

export async function GET() {
  const session = await getServerSession(authOptions);
  try {
    const rawData =
      await dbConnection`SELECT * FROM tasks WHERE user_id = ${session?.user.id}  `;

    if (!rawData || rawData.length === 0) {
      throw new HttpError("Tasks data not found!", 404);
    }

    const formatedData = rawData.map((item) => ({
      name: item.name,
      id: item.id,
      userId: Number(item.user_id),
      createdAt: new Date(item.createdat),
    }));

    const parsedData = tasksSchema.parse(formatedData);

    return NextResponse.json(
      { sucess: true, data: parsedData },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json(
        { sucess: false, message: error.message },
        { status: error.status }
      );
    }
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

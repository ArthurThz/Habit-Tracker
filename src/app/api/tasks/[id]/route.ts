import { dbConnection } from "@/lib/neon";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.pathname.split("/").pop();
  try {
    const result = await dbConnection`SELECT * FROM tasks WHERE id = ${id} `;
    return NextResponse.json({ sucess: true, data: result }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

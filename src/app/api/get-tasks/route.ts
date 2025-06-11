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

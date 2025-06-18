import { NextResponse } from "next/server";
import { dbConnection } from "@/lib/db/neon";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  const body = await request.json();

  const { name, password, email } = body;

  const hashedPassword = bcrypt.hashSync(password, 10);

  try {
    const userExists =
      await dbConnection`SELECT email from users WHERE email = ${email} LIMIT 1`;

    if (userExists.length > 0) {
      return NextResponse.json(
        { sucess: false, message: "This user already exists, try to log in" },
        { status: 409 }
      );
    }

    const result =
      await dbConnection`INSERT INTO users (name, password, email) VALUES (${name},${hashedPassword},${email})`;

    return NextResponse.json({ success: true, data: result }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

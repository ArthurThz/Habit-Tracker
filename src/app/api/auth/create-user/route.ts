import { NextResponse } from "next/server";
import { dbConnection } from "@/lib/db/neon";
import bcrypt from "bcryptjs";
import { HttpError } from "@/types/http-error";
import { createUserSchema } from "@/schemas/user-schema";

export async function POST(request: Request) {
  const body = await request.json();

  if (!body) {
    throw new HttpError("User data is required to signup", 400);
  }

  try {
    const parsedBody = createUserSchema.safeParse(body);

    if (!parsedBody.success) {
      throw new HttpError("Invalid data type", 400);
    }

    const { name, password, email } = parsedBody.data;

    const hashedPassword = bcrypt.hashSync(password, 10);

    const userExists =
      await dbConnection`SELECT email from users WHERE email = ${email} LIMIT 1`;

    if (userExists.length > 0) {
      return NextResponse.json(
        { success: false, message: "This user already exists, try to log in" },
        { status: 409 }
      );
    }

    const result =
      await dbConnection`INSERT INTO users (name, password, email) VALUES (${name},${hashedPassword},${email})`;

    return NextResponse.json({ success: true, data: result }, { status: 201 });
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

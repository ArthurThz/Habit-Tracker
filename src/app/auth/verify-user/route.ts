import { dbConnection } from "@/lib/neon";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
});

export type UserLogin = z.infer<typeof loginSchema>;
export async function POST(request: Request) {
  const body = await request.json();

  const data = loginSchema.parse(body);

  try {
    const result =
      await dbConnection`SELECT id,name,password FROM users WHERE email = ${data.email}`;

    const user = result[0];

    if (!user) {
      return NextResponse.json(
        { sucess: false, message: "User not found" },
        { status: 401 }
      );
    }

    const isPasswordCorrect = bcrypt.compare(data.password, user.password);

    if (!isPasswordCorrect) {
      return NextResponse.json(
        { sucess: false, message: "Password is incorrect" },
        { status: 401 }
      );
    }

    const parsedUser = userSchema.parse({
      id: user.id,
      name: user.name,
      email: user.email,
    });

    return NextResponse.json({ user: parsedUser }, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}

"use server";

import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);
export const getUser = async () => {
  const response = await sql`SELECT * FROM users`;
  console.log(response[0]);
  return response[0];
};

type createTaskProps = {
  taskName: string;
  userId: number;
};
export const createTask = async ({ taskName, userId }: createTaskProps) => {
  const response =
    await sql`INSERT INTO tasks (name, user_id) values (${taskName},${userId}) `;

  console.log(response);
  return response;
};

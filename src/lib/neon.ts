import { neon } from "@neondatabase/serverless";

export const dbConnection = neon(process.env.DATABASE_URL!);

export const getUser = async () => {
  const response = await dbConnection`SELECT * FROM users`;
  console.log(response[0]);
  return response[0];
};

type createTaskProps = {
  taskName: string;
  userId: number;
};
export const createTask = async ({ taskName, userId }: createTaskProps) => {
  const response =
    await dbConnection`INSERT INTO tasks (name, user_id) values (${taskName},${userId}) `;

  console.log(response);
  return response;
};

import { dbConnection } from "./neon";

export const getTasks = async (userId: string) => {
  const tasks =
    await dbConnection`SELECT * FROM tasks WHERE user_id = ${userId}`;

  return tasks;
};

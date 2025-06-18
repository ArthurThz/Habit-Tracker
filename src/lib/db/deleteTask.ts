import { dbConnection } from "./neon";

export const deleteTask = async (id: string) => {
  const result = await dbConnection`DELETE FROM tasks WHERE id = ${id}`;

  return result;
};

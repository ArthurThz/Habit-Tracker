import { dbConnection } from "./neon";

export const findTaskById = async (id: string) => {
  const result = await dbConnection`SELECT * FROM tasks WHERE id = ${id} `;

  return result;
};

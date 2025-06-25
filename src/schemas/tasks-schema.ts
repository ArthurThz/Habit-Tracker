import { z } from "zod";

export const taskByIdSchema = z.object({
  name: z.string(),
  id: z.number(),
  userId: z.number(),
  createdAt: z.coerce.date(),
});
export type Task = z.infer<typeof taskByIdSchema>;

export const tasksSchema = z.array(taskByIdSchema);

export type TasksArray = z.infer<typeof tasksSchema>;

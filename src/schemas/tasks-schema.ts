import { z } from "zod";

export const taskSchema = z.object({
  name: z.string(),
  id: z.number(),
  userId: z.number(),
  createdAt: z.coerce.date(),
});
export type Task = z.infer<typeof taskSchema>;

export const tasksSchema = z.array(taskSchema);

export type TasksArray = z.infer<typeof tasksSchema>;

export const createTaskSchema = z.object({
  taskName: z.string(),
});

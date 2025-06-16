import { z } from "zod";

export const activitySchema = z.object({
  taskId: z.number(),
  userId: z.number(),
  finishTime: z.string().datetime(),
  startTime: z.string().datetime(),
  id: z.number(),
});

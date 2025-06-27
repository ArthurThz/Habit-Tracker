import { z } from "zod";

export const activitySchema = z.object({
  taskId: z.number(),
  userId: z.number(),
  startTime: z.string().datetime({ offset: true }),
  finishTime: z.string().datetime({ offset: true }),
});

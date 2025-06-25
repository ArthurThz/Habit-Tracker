import { z } from "zod";

export const taskByIdSchema = z.object({
  name: z.string(),
  id: z.number(),
  userId: z.number(),
  createdAt: z.coerce.date(),
});

import { z } from "zod";

export const activityDashboardDataSchema = z.object({
  total: z.number(),
  lastActivity: z
    .object({
      name: z.string(),
    })
    .nullable(),
  longestTimeSpent: z.object({
    name: z.string(),
    minutes: z.number(),
    hours: z.number(),
  }),
  activitiesConcludedByMonth: z.array(
    z.object({
      month: z.string(),
      tasks: z.union([z.string(), z.number()]),
    })
  ),
  history: z.array(
    z.object({
      date: z.string(),
      quantity: z.number(),
    })
  ),
  frequentTasksByName: z.array(
    z.object({
      name: z.string(),
      count: z.number(),
    })
  ),
});
export type DashboardResponse = z.infer<typeof activityDashboardDataSchema>;

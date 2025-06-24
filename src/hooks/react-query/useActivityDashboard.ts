import { activityDashboardDataSchema } from "@/schemas/dashboard-response-schema";
import { useQuery } from "@tanstack/react-query";

export const useActivityDashboard = ({ userId }: { userId: number }) => {
  return useQuery({
    queryKey: ["dashboard", userId],
    queryFn: async () => {
      const response = await fetch(`/api/activities/dashboard`);
      const data = await response.json();

      return activityDashboardDataSchema.parse(data.data);
    },
  });
};

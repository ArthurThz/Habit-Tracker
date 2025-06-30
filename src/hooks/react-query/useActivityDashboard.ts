import { fetchAndParse } from "@/lib/fetchAndParse";
import { activityDashboardDataSchema } from "@/schemas/dashboard-response-schema";
import { useQuery } from "@tanstack/react-query";

export const useActivityDashboard = ({ userId }: { userId: number }) => {
  return useQuery({
    queryKey: ["dashboard", userId],
    queryFn: () =>
      fetchAndParse("/api/activities/dashboard/", activityDashboardDataSchema),
  });
};

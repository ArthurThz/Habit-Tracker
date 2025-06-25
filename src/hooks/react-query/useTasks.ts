import { fetchAndParse } from "@/lib/fetchAndParse";
import { tasksSchema } from "@/schemas/tasks-schema";
import { useQuery } from "@tanstack/react-query";

export const useTasks = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: () => fetchAndParse("/api/tasks", tasksSchema),
    refetchOnWindowFocus: false,
  });
};

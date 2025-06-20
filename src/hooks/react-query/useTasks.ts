import { useQuery } from "@tanstack/react-query";

export const useTasks = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await fetch("/api/tasks");
      const data = await response.json();
      return data.data;
    },
  });
};

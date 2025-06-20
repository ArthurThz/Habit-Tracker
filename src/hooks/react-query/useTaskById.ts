import { useQuery } from "@tanstack/react-query";

export const useTaskById = ({ id }: { id: number }) => {
  return useQuery({
    queryKey: ["taskById"],
    queryFn: async () => {
      const response = await fetch(`/api/tasks/${id}`);
      const data = await response.json();

      return data.data;
    },
  });
};

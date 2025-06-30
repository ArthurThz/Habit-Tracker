import { fetchAndParse } from "@/lib/fetchAndParse";
import { taskSchema } from "@/schemas/tasks-schema";
import { useQuery } from "@tanstack/react-query";

export const useTaskById = ({ id }: { id: number }) => {
  return useQuery({
    queryKey: ["taskById", id],
    queryFn: () => fetchAndParse(`/api/tasks/${id}`, taskSchema),
    refetchOnWindowFocus: false,
  });
};

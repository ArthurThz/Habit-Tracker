import { taskByIdSchema } from "@/schemas/tasks-schema";
import { useQuery } from "@tanstack/react-query";

export const useTaskById = ({ id }: { id: number }) => {
  return useQuery({
    queryKey: ["taskById", id],
    queryFn: async () => {
      const response = await fetch(`/api/tasks/${id}`);

      if (!response.ok) {
        throw new Error("An error occurred while fetching your task");
      }

      const data = await response.json();

      try {
        const parsedData = taskByIdSchema.parse(data.data);
        return parsedData;
      } catch (error) {
        console.error("❌ Erro ao fazer parse com Zod:", error);
        throw error; // importante para o React Query tratar como erro
      }
    },
    refetchOnWindowFocus: false,
  });
};

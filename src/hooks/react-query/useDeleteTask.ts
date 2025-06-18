import { useMutation } from "@tanstack/react-query";

export const useDeleteTask = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();
      return data;
    },
  });
};

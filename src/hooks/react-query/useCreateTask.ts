import { useMutation } from "@tanstack/react-query";

type NewTask = {
  taskName: string;
};

export const useCreateTask = () => {
  return useMutation({
    mutationFn: async (newTask: NewTask) => {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...newTask }),
      });

      if (!response.ok) {
        throw new Error("Can't create a new task!");
      }

      const data = await response.json();
      return data.data;
    },
  });
};

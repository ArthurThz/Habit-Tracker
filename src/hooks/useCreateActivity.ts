import { useMutation } from "@tanstack/react-query";

type ActivityData = {
  taskId: number;
  userId: number;
  startTime: string;
  finishTime: string;
};

export const useCreateActivity = () => {
  return useMutation({
    mutationFn: async (newActivity: ActivityData) => {
      const response = await fetch("/api/activities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newActivity),
      });

      if (!response.ok) {
        throw new Error("Can't create a new activity");
      }

      const data = await response.json();
      return data.data;
    },
  });
};

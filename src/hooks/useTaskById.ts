import { Tasks } from "@/types/tasks";
import { useEffect, useState } from "react";

export const useTaskById = () => {
  const [tasks, setTasks] = useState<Tasks[]>([]);
  useEffect(() => {
    const fetchTask = async () => {
      const response = await fetch("/api/get-tasks");
      const data = await response.json();
      setTasks(data.data);
    };

    fetchTask();
  }, []);

  return { tasks };
};

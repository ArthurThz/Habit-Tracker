import { useEffect, useState } from "react";

export type Tasks = {
  id: number;
  name: string;
  createdat: Date;
  userId: number;
};

export const useTasks = () => {
  const [tasks, setTasks] = useState<Tasks[]>([]);
  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("/api/get-tasks");
      const data = await response.json();
      setTasks(data.data);
    };

    fetchTasks();
  }, []);

  return { tasks };
};

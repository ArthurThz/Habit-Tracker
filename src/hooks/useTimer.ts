import { useEffect, useRef, useState } from "react";
import { useCreateActivity } from "./react-query/useCreateActivity";
import { toast } from "sonner";

type Task = {
  isTaskFinished: boolean;
  timeSpent: string;
  userId: number;
  taskId: number;
  startTime: string;
  finishTime: string;
};

const initialValue: Task = {
  isTaskFinished: false,
  timeSpent: "",
  startTime: "",
  finishTime: "",
  taskId: 0,
  userId: 0,
};
export const useTimer = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [task, setTask] = useState<Task>(initialValue);
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    } else if (!isRunning && intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const createActivity = useCreateActivity();

  const handleCreateActivity = (task: Task) => {
    const { taskId, userId, startTime, finishTime } = task;
    const activityData = {
      taskId,
      userId,
      startTime,
      finishTime,
    };

    createActivity.mutate(activityData, {
      onSuccess: () => {
        toast.success("Activity saved, keep working!");
      },
      onError: () => {
        toast.error("Can't save your activity");
      },
    });

    setTask(initialValue);
  };
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (timeInSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return {
    handleCreateActivity,
    time,
    isRunning,
    setIsRunning,
    setTime,
    formatTime,
    setTask,
    task,
  };
};

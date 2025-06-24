import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { useTimer } from "@/hooks/useTimer";

const Timer = ({ taskId }: { taskId: number }) => {
  const session = useSession();
  const {
    formatTime,
    isRunning,
    setIsRunning,
    setTask,
    setTime,
    task,
    time,
    handleCreateActivity,
  } = useTimer();

  const getDate = () => new Date().toISOString();

  const handleStartTimer = () => {
    setTask({
      ...task,
      taskId: taskId,
      userId: session.data ? Number(session.data?.user.id) : 0,
      startTime: getDate(),
      isTaskFinished: false,
    });
    setTime(0);
    setIsRunning(true);
  };

  const handleStopTimer = () => {
    const updatedTask = {
      ...task,
      finishTime: getDate(),
      timeSpent: formatTime(time),
      isTaskfinished: true,
    };
    setTask(updatedTask);
    setIsRunning(false);
    handleCreateActivity(updatedTask);
  };

  return (
    <div className="flex flex-col w-full items-center gap-4">
      <h2 className="font-quantico text-6xl">{formatTime(time)}</h2>
      <div className="flex gap-4">
        <Button onClick={handleStartTimer} disabled={isRunning}>
          Start Task
        </Button>
        <Button onClick={handleStopTimer}>End Task</Button>
      </div>
      {task.isTaskFinished && (
        <div className="mt-1">
          You passed {task.timeSpent} in this task, good job!
        </div>
      )}
    </div>
  );
};

export default Timer;

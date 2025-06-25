"use client";
import Loader from "@/components/loader";
import NavigateButton from "@/components/navigate-button";
import Task from "@/components/task";
import { useTaskById } from "@/hooks/react-query/useTaskById";
import { useParams } from "next/navigation";

const TaskPage = () => {
  const params = useParams();
  const parsedId = parseInt(params.id as string);
  const { data: taskById, isLoading } = useTaskById({ id: parsedId });

  if (isLoading) return <Loader />;
  return (
    <div className="flex items-center justify-center flex-col h-full w-full gap-4 p-4">
      {taskById ? (
        <Task id={taskById.id} name={taskById.name} />
      ) : (
        <>
          <NavigateButton label="My Tasks" path="/tasks" />
          <p className="text-lg font-quantico text-muted-foreground italic">
            No task found
          </p>
        </>
      )}
    </div>
  );
};

export default TaskPage;

"use client";
import { Tasks } from "@/types/tasks";
import TaskPreview from "../task-preview";
import { Input } from "../ui/input";
import { MyTasks, useMyTasks } from "@/hooks/useSearchTasks";
import { useRouter } from "next/navigation";

const MyTasksContainer = ({ tasks }: MyTasks) => {
  const router = useRouter();

  const { handleSearchTask, tasksState } = useMyTasks({ tasks });

  return (
    <div className="w-full flex flex-col justify-center  items-center gap-4">
      <h1 className="font-quantico text-4xl">My Tasks</h1>
      <Input
        className="w-[350px]"
        placeholder="search task"
        onChange={handleSearchTask}
      />
      {tasks.length === 0 ? (
        <p className="text-lg font-quantico">
          Looks like your task list is empty. Let{"'"}s get started —{" "}
          <span
            className="text-green-500 underline underline-offset-2 hover:cursor-pointer"
            onClick={() => router.push("/tasks/new-task")}
          >
            click here
          </span>
          {""} to add one!
        </p>
      ) : tasksState.length === 0 ? (
        <p className="text-lg font-quantico text-muted-foreground italic">
          No tasks found with that name.
        </p>
      ) : (
        <div className="custom-scrollbar w-full lg:w-[45%] gap-4 h-full overflow-y-auto p-4 grid grid-cols-1 lg:grid-cols-2 justify-items-center">
          {tasksState.map((item: Tasks) => (
            <TaskPreview
              createdat={item.createdat}
              id={item.id}
              name={item.name}
              userId={item.userId}
              key={item.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTasksContainer;

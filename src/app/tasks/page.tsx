"use client";
import PreviousPageButton from "@/components/previous-page-button";
import TaskPreview from "@/components/task-preview";
import { useTasks } from "@/hooks/useTasks";

const Tasks = () => {
  const { tasks } = useTasks();

  return (
    <div className="w-full h-screen flex flex-col gap-4 items-center p-4">
      <PreviousPageButton label="Go Back" />
      <h1 className="font-quantico text-4xl">My Tasks</h1>
      <div className=" custom-scrollbar max-w-2/3 gap-4 h-full overflow-y-auto p-4 grid grid-cols-2 justify-items-center ">
        {tasks.map((item) => (
          <TaskPreview
            createdat={item.createdat}
            id={item.id}
            name={item.name}
            userId={item.userId}
            key={item.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Tasks;

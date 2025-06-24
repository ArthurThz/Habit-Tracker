"use client";
import Loader from "@/components/loader";
import PreviousPageButton from "@/components/previous-page-button";
import TaskPreview from "@/components/task-preview";
import { useTasks } from "@/hooks/react-query/useTasks";
import { Tasks } from "@/types/tasks";
import { useRouter } from "next/navigation";

const MyTasksPage = () => {
  const { data: tasks, isLoading, isError } = useTasks();
  const router = useRouter();

  if (isLoading) return <Loader />;
  if (isError) return <h1>Houve um erro</h1>;
  return (
    <div className="w-full h-screen flex flex-col gap-4 items-center px-4 pt-40">
      <PreviousPageButton label="Go Back" />
      <h1 className="font-quantico text-4xl">My Tasks</h1>
      {tasks.length > 0 ? (
        <div className=" custom-scrollbar w-full lg:w-1/2 gap-4 h-full overflow-y-auto p-4 grid grid-cols-1 lg:grid-cols-2  justify-items-center ">
          {tasks.map((item: Tasks) => (
            <TaskPreview
              createdat={item.createdat}
              id={item.id}
              name={item.name}
              userId={item.userId}
              key={item.id}
            />
          ))}
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default MyTasksPage;

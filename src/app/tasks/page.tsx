"use client";
import Loader from "@/components/loader";
import MyTasksContainer from "@/components/containers/my-tasks-container";
import PreviousPageButton from "@/components/navigate-button";
import { useTasks } from "@/hooks/react-query/useTasks";

const MyTasksPage = () => {
  const { data: tasksData, isLoading, isError } = useTasks();

  if (isLoading) return <Loader />;
  if (isError) return <h1>Houve um erro</h1>;

  return (
    <div className="w-full h-full flex flex-col gap-4 items-center px-4">
      <PreviousPageButton label="Home" path="/home" />
      <MyTasksContainer tasks={tasksData} />
    </div>
  );
};

export default MyTasksPage;

import { TasksArray } from "@/schemas/tasks-schema";
import { ChangeEvent, useEffect, useState } from "react";

export type MyTasks = {
  tasks: TasksArray;
};
export const useMyTasks = ({ tasks }: MyTasks) => {
  const [tasksState, setTasksState] = useState<TasksArray>(tasks);
  const [SearchField, setSearchField] = useState<string>("");

  useEffect(() => {
    const SearchFieldHandler = setTimeout(() => {
      if (!SearchField.trim()) {
        setTasksState(tasks);
      } else {
        setTasksState(
          tasks.filter((item) =>
            item.name.toLowerCase().includes(SearchField.toLowerCase())
          )
        );
      }
    }, 500);

    return () => {
      clearTimeout(SearchFieldHandler);
    };
  }, [SearchField, tasks]);
  const handleSearchTask = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setSearchField(value);
  };

  return {
    tasksState,
    handleSearchTask,
  };
};

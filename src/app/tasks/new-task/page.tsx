"use client";

import NewTaskForm from "@/components/forms/new-task-form";
import PreviousPageButton from "@/components/previous-page-button";

const NewTaskPage = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center p-4 gap-4">
      <PreviousPageButton label="Go Back" />
      <h1 className="font-quantico text-4xl text-center lg:text-start ">
        Fill the form to add a new task
      </h1>
      <NewTaskForm />
    </div>
  );
};

export default NewTaskPage;

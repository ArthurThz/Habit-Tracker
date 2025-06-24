"use client";

import NewTaskForm from "@/components/forms/new-task-form";
import NavigateButton from "@/components/navigate-button";

const NewTaskPage = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center p-4 gap-4">
      <NavigateButton label="Home" path="/home" />
      <NewTaskForm />
    </div>
  );
};

export default NewTaskPage;

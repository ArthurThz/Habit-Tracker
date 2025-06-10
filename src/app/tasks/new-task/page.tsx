"use client";

import NewTaskForm from "@/components/forms/new-task-form";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const NewTaskPage = () => {
  const navigate = useRouter();
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center p-4 gap-4">
      <button
        onClick={() => navigate.back()}
        className="flex items-center  hover:underline hover:cursor-pointer underline-offset-2"
      >
        <ChevronLeft />
        <span>Go back</span>
      </button>
      <h1 className="font-quantico text-4xl text-center lg:text-start ">
        Fill the form to add a new task
      </h1>
      <NewTaskForm />
    </div>
  );
};

export default NewTaskPage;

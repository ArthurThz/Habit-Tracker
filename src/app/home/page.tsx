"use client";

import ContentPreview from "@/components/content-preview";

const HomePage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center lg:flex-row">
      <ContentPreview
        buttonLabel="Add New"
        cardImage="./people.svg"
        contentDescription="Add a new task to help you create a new habit"
        title="New Task"
        linkTo="/tasks/new-task"
      />
      <ContentPreview
        buttonLabel="My Tasks"
        cardImage="./improve.svg"
        contentDescription="Access your tasks and keep working"
        title="My Tasks"
        linkTo="/tasks"
      />
    </div>
  );
};

export default HomePage;

"use client";

import ContentPreview from "@/components/content-preview";

const HomePage = () => {
  return (
    <div className="min-h-screen h-full w-full flex flex-col px-2 py-4 items-center lg:justify-center lg:flex-row">
      <ContentPreview
        buttonLabel="Add New"
        cardImage="./activity-preview.svg"
        contentDescription="Add a new task to create a habit"
        title="New Task"
        linkTo="/tasks/new-task"
      />
      <ContentPreview
        buttonLabel="My Tasks"
        cardImage="./my-tasks-preview.svg"
        contentDescription="Access your tasks and keep working"
        title="My Tasks"
        linkTo="/tasks"
      />
      <ContentPreview
        buttonLabel="My activity"
        cardImage="./dashboard-preview.svg"
        contentDescription="Get insights from your tasks"
        title="Activity Dashboard"
        linkTo="/tasks/dashboard"
      />
    </div>
  );
};

export default HomePage;

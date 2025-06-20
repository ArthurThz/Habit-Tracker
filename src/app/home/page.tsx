"use client";

import ContentPreview from "@/components/content-preview";
import { Button } from "@/components/ui/button";
import { ChartNoAxesCombined, CirclePlus, LayoutList } from "lucide-react";
import { signOut } from "next-auth/react";

const HomePage = () => {
  return (
    <div className="min-h-screen h-full w-full flex flex-col px-2 py-4 items-center lg:justify-center lg:flex-row pt-10 lg:pt-0">
      <Button onClick={() => signOut({ callbackUrl: "/" })}>Log Out</Button>
      <ContentPreview
        buttonLabel="Add New"
        cardImage="./activity-preview.svg"
        contentDescription="Add a new task to create a habit"
        title="New Task"
        linkTo="/tasks/new-task"
        icon={<CirclePlus className="text-green-600" />}
      />
      <ContentPreview
        buttonLabel="My Tasks"
        cardImage="./my-tasks-preview.svg"
        contentDescription="Access your tasks"
        title="My Tasks"
        linkTo="/tasks"
        icon={<LayoutList className="text-green-600" />}
      />
      <ContentPreview
        buttonLabel="My activity"
        cardImage="./dashboard-preview.svg"
        contentDescription="Get insights from your tasks"
        title="Activity Dashboard"
        linkTo="/tasks/dashboard"
        icon={<ChartNoAxesCombined className="text-green-600" />}
      />
    </div>
  );
};

export default HomePage;

"use client";

import Loader from "@/components/loader";
import { Badge } from "@/components/ui/badge";
import { useActivityDashboard } from "@/hooks/useActivityDashboard";

const DashboardPage = () => {
  const { data: activities, isLoading } = useActivityDashboard({ userId: 1 });

  console.log(activities);

  if (isLoading) return <Loader />;
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center p-8">
      <div className="w-[70%] h-full ring-2 rounded-md ring-zinc-900 p-4">
        <h1>Activities Dashboard</h1>
        <div className="w-full h-auto p-4 flex items-center justify-center gap-4">
          <Badge variant="outline" className="text-sm p-4">
            Last completed task: {activities.lastActivity.name}
          </Badge>

          <Badge variant="outline" className="text-sm p-4">
            Last completed task: {activities.total}
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

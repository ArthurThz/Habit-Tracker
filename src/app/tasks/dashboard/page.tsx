"use client";

import CustomBadge from "@/components/custom-badge";
import Loader from "@/components/loader";
import { useActivityDashboard } from "@/hooks/react-query/useActivityDashboard";
import { CircleCheckBig, ClockArrowUp, ListCheck } from "lucide-react";

const DashboardPage = () => {
  const { data: activities, isLoading } = useActivityDashboard({ userId: 1 });

  console.log(activities);

  if (isLoading) return <Loader />;
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center p-8">
      <div className="w-[70%] h-full ring-2 rounded-md ring-zinc-800 p-4">
        <h1>Activities Dashboard</h1>
        <div className="w-full h-auto p-4 flex items-center justify-center gap-4">
          <CustomBadge
            title="Last Activity"
            icon={<ListCheck size={18} />}
            content={activities.lastActivity.name}
          />

          <CustomBadge
            title="Completed Tasks"
            icon={<CircleCheckBig size={18} />}
            content={activities.total}
          />
          <CustomBadge
            title="Longest Time Spent"
            icon={<ClockArrowUp size={18} />}
            content={`${activities.longestTimeSpent.minutes} minutes`}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

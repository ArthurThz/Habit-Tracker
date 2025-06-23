"use client";

import CustomBadge from "@/components/custom-badge";
import MostFrequentTasksByName from "@/components/dashboard/most-frequent-tasks-by-name-charts";
import TasksConcludedByMonthCharts from "@/components/dashboard/tasks-conclued-by-month";
import TasksHistoryChart from "@/components/dashboard/tasks-history";
import Loader from "@/components/loader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useActivityDashboard } from "@/hooks/react-query/useActivityDashboard";
import { CircleCheckBig, ClockArrowUp, ListCheck } from "lucide-react";

const DashboardPage = () => {
  const { data: activities, isLoading } = useActivityDashboard({ userId: 1 });

  console.log("ACTIVITIES", activities);

  const rawActivitiesConcludedByMonth =
    activities?.activitiesConcludedByMonth ?? [];

  const activitiesConcludedByMonthData = rawActivitiesConcludedByMonth.map(
    (item: { month: string; tasks: string | number }) => ({
      ...item,
      tasks: Number(item.tasks),
    })
  );

  if (isLoading) return <Loader />;
  return (
    <div className="w-full min-h-screen h-auto flex flex-col items-center justify-center p-0 lg:p-8 pt-20 lg:pt-44">
      <div className="w-full lg:w-[70%] min-h-[90vh] h-auto rounded-md  p-4 lg:p-12">
        <div className="w-full flex-col lg:flex-row max-h-1/5 h-auto p-4 flex items-center justify-center gap-4">
          <CustomBadge
            title="Last Activity"
            icon={<ListCheck size={18} />}
            content={activities?.lastActivity?.name}
          />

          <CustomBadge
            title="Completed Tasks"
            icon={<CircleCheckBig size={18} />}
            content={activities?.total}
          />
          <CustomBadge
            title="Longest Time Spent"
            icon={<ClockArrowUp size={18} />}
            content={`${activities?.longestTimeSpent.minutes} minutes`}
          />
        </div>
        <div className="w-full h-full p-8 flex flex-col gap-12">
          <TasksHistoryChart history={activities?.history ?? []} />
          <TasksConcludedByMonthCharts data={activitiesConcludedByMonthData} />
          <div className="w-full h-auto flex gap-4">
            <MostFrequentTasksByName
              tasks={activities?.frequentTasksByName ?? []}
            />
            <Card className="w-1/2">
              <CardHeader>
                <CardTitle>Average Time</CardTitle>
                <CardDescription>
                  Your average time spent in tasks
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4 h-full p-10">
                <div className="w-full h-full  flex items-center justify-center">
                  <span className="text-6xl">0.5 hours</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

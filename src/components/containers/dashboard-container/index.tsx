import CustomBadge from "@/components/custom-badge";
import MostFrequentTasksByName from "@/components/dashboard/most-frequent-tasks-by-name-charts";
import TasksConcludedByMonthCharts from "@/components/dashboard/tasks-conclued-by-month";
import TasksHistoryChart from "@/components/dashboard/tasks-history";
import Loader from "@/components/loader";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useActivityDashboard } from "@/hooks/react-query/useActivityDashboard";
import { useGetUserSession } from "@/hooks/useGetUserSession";
import { DashboardResponse } from "@/schemas/dashboard-response-schema";
import { ListCheck, CircleCheckBig, ClockArrowUp, Timer } from "lucide-react";
import { useRouter } from "next/navigation";

const DashboardContainer = () => {
  const router = useRouter();
  const { user } = useGetUserSession();
  const { data: activities, isLoading } = useActivityDashboard({
    userId: Number(user?.id),
  });

  const userName = user?.name;

  if (isLoading) return <Loader />;

  const hasDashboardData = ({
    data,
  }: {
    data: DashboardResponse | undefined;
  }) => {
    if (!data) return false;

    return (
      data.history?.some((item) => item.quantity > 0) ||
      data.frequentTasksByName.length > 0 ||
      data.activitiesConcludedByMonth.some((item) => item.tasks > 0)
    );
  };

  const hasTasks = hasDashboardData({ data: activities });

  return (
    <>
      {userName && (
        <h3 className="text-lg mt-4 font-quantico">
          Hello <span className="text-green-500">{userName}</span>, take a look
          at your activities
        </h3>
      )}
      {hasTasks ? (
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
            <TasksConcludedByMonthCharts
              data={activities?.activitiesConcludedByMonth ?? []}
            />
            <div className="w-full h-auto flex flex-col lg:flex-row gap-4">
              <MostFrequentTasksByName
                tasks={activities?.frequentTasksByName ?? []}
              />
              <Card className="lg:w-1/2">
                <CardHeader>
                  <CardTitle>Average Time</CardTitle>
                  <CardDescription>
                    Your average time spent on tasks
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4 h-full p-10">
                  <div className="w-full h-full  flex items-center justify-center">
                    <span className=" text-2xl lg:text-6xl flex gap-2 lg:gap-4 items-center">
                      <Timer className="w-[30px] h-[30px] lg:w-[60px] lg:h-[60px] text-green-500" />
                      {`${activities?.averageTaskDuration.avgTaskDuration} minutes`}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-[50vh] mt-8">
          <p className="text-lg font-quantico">
            No dashboard data yet. Start and stop a task to generate insights.
            {""}{" "}
            <span
              onClick={() => router.push("/tasks")}
              className="text-green-500 underline underline-offset-2 hover:cursor-pointer"
            >
              click here
            </span>{" "}
            to access your tasks
          </p>
        </div>
      )}
    </>
  );
};

export default DashboardContainer;

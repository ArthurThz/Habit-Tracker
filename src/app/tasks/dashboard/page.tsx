"use client";

import CustomBadge from "@/components/custom-badge";
import Loader from "@/components/loader";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useActivityDashboard } from "@/hooks/react-query/useActivityDashboard";
import { CircleCheckBig, ClockArrowUp, ListCheck } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const DashboardPage = () => {
  const { data: activities, isLoading } = useActivityDashboard({ userId: 1 });

  console.log(activities);
  const chartData = [
    { month: "January", executadas: 186 },
    { month: "February", executadas: 305 },
    { month: "March", executadas: 237 },
    { month: "April", executadas: 73 },
    { month: "May", executadas: 209 },
    { month: "June", executadas: 214 },
  ];
  const chartConfig = {
    executadas: {
      label: "executadas",
      color: "#2563eb",
    },
  } satisfies ChartConfig;

  if (isLoading) return <Loader />;
  return (
    <div className="w-full min-h-screen h-auto flex flex-col items-center justify-center p-8">
      <div className="w-[70%] min-h-[90vh] h-auto ring-2 rounded-md ring-zinc-800 p-4">
        <h1>Activities Dashboard</h1>
        <div className="w-full max-h-1/5 h-auto p-4 flex items-center justify-center gap-4">
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
        <div className="w-full h-full ring-1 p-4 flex">
          <div className="min-h-[50vh] w-full ring-1">
            <ChartContainer
              config={chartConfig}
              className="min-h-[200px] h-full w-full"
            >
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="executadas"
                  fill="var(--color-executadas)"
                  radius={4}
                />
              </BarChart>
            </ChartContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

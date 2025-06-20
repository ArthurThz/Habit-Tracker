"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export const description = "An interactive area chart";

// const chartData = [
//   { date: "2024-04-01", quantity: 222 },
//   { date: "2024-04-02", quantity: 97 },
//   { date: "2024-04-03", quantity: 167 },
//   { date: "2024-04-04", quantity: 242 },
//   { date: "2024-04-05", quantity: 373 },
//   { date: "2024-04-06", quantity: 301 },
//   { date: "2024-04-07", quantity: 245 },
//   { date: "2024-04-08", quantity: 409 },
//   { date: "2024-04-09", quantity: 59 },
//   { date: "2024-04-10", quantity: 261 },
//   { date: "2024-04-11", quantity: 327 },
//   { date: "2024-04-12", quantity: 292 },
//   { date: "2024-04-13", quantity: 342 },
//   { date: "2024-04-14", quantity: 137 },
//   { date: "2024-04-15", quantity: 120 },
//   { date: "2024-04-16", quantity: 138 },
//   { date: "2024-04-17", quantity: 446 },
//   { date: "2024-04-18", quantity: 364 },
//   { date: "2024-04-19", quantity: 243 },
//   { date: "2024-04-20", quantity: 89 },
//   { date: "2024-04-21", quantity: 137 },
//   { date: "2024-04-22", quantity: 224 },
//   { date: "2024-04-23", quantity: 138 },
//   { date: "2024-04-24", quantity: 387 },
//   { date: "2024-04-25", quantity: 215 },
//   { date: "2024-04-26", quantity: 75 },
//   { date: "2024-04-27", quantity: 383 },
//   { date: "2024-04-28", quantity: 122 },
//   { date: "2024-04-29", quantity: 315 },
//   { date: "2024-04-30", quantity: 454 },
//   { date: "2024-05-01", quantity: 165 },
//   { date: "2024-05-02", quantity: 293 },
//   { date: "2024-05-03", quantity: 247 },
//   { date: "2024-05-04", quantity: 385 },
//   { date: "2024-05-05", quantity: 481 },
//   { date: "2024-05-06", quantity: 498 },
//   { date: "2024-05-07", quantity: 388 },
//   { date: "2024-05-08", quantity: 149 },
//   { date: "2024-05-09", quantity: 227 },
//   { date: "2024-05-10", quantity: 293 },
//   { date: "2024-05-11", quantity: 335 },
//   { date: "2024-05-12", quantity: 197 },
//   { date: "2024-05-13", quantity: 197 },
//   { date: "2024-05-14", quantity: 448 },
//   { date: "2024-05-15", quantity: 473 },
//   { date: "2024-05-16", quantity: 338 },
//   { date: "2024-05-17", quantity: 499 },
//   { date: "2024-05-18", quantity: 315 },
//   { date: "2024-05-19", quantity: 235 },
//   { date: "2024-05-20", quantity: 177 },
//   { date: "2024-05-21", quantity: 82 },
//   { date: "2024-05-22", quantity: 81 },
//   { date: "2024-05-23", quantity: 252 },
//   { date: "2024-05-24", quantity: 294 },
//   { date: "2024-05-25", quantity: 201 },
//   { date: "2024-05-26", quantity: 213 },
//   { date: "2024-05-27", quantity: 420 },
//   { date: "2024-05-28", quantity: 233 },
//   { date: "2024-05-29", quantity: 78 },
//   { date: "2024-05-30", quantity: 340 },
//   { date: "2024-05-31", quantity: 178 },
//   { date: "2024-06-01", quantity: 178 },
//   { date: "2024-06-02", quantity: 470 },
//   { date: "2024-06-03", quantity: 103 },
//   { date: "2024-06-04", quantity: 439 },
//   { date: "2024-06-05", quantity: 88 },
//   { date: "2024-06-06", quantity: 294 },
//   { date: "2024-06-07", quantity: 323 },
//   { date: "2024-06-08", quantity: 385 },
//   { date: "2024-06-09", quantity: 438 },
//   { date: "2024-06-10", quantity: 155 },
//   { date: "2024-06-11", quantity: 92 },
//   { date: "2024-06-12", quantity: 492 },
//   { date: "2024-06-13", quantity: 81 },
//   { date: "2024-06-14", quantity: 426 },
//   { date: "2024-06-15", quantity: 307 },
//   { date: "2024-06-16", quantity: 371 },
//   { date: "2024-06-17", quantity: 475 },
//   { date: "2024-06-18", quantity: 107 },
//   { date: "2024-06-19", quantity: 341 },
//   { date: "2024-06-20", quantity: 408 },
//   { date: "2024-06-21", quantity: 169 },
//   { date: "2024-06-22", quantity: 317 },
//   { date: "2024-06-23", quantity: 480 },
//   { date: "2024-06-24", quantity: 132 },
//   { date: "2024-06-25", quantity: 141 },
//   { date: "2024-06-26", quantity: 434 },
//   { date: "2024-06-27", quantity: 448 },
//   { date: "2024-06-28", quantity: 149 },
//   { date: "2024-06-29", quantity: 103 },
//   { date: "2024-06-30", quantity: 446 },
// ];

const chartConfig = {
  date: {
    label: "Date",
  },
  quantity: {
    label: "Quantity",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

type Props = {
  history: {
    date: string;
    quantity: number;
  }[];
};

const TasksHistoryChart = ({ history }: Props) => {
  const [timeRange, setTimeRange] = useState("90d");

  const filteredData = history.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date();
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <div className="w-full h-auto">
      <Card className="pt-0">
        <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
          <div className="grid flex-1 gap-1">
            <CardTitle>Activities History</CardTitle>
            <CardDescription>
              Showing total times that you have started an activity
            </CardDescription>
          </div>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full"
          >
            <AreaChart data={filteredData}>
              <defs>
                <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-desktop)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-desktop)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                }}
              />
              <YAxis />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      });
                    }}
                    indicator="line"
                  />
                }
              />
              <Area
                dataKey="quantity"
                type="natural"
                fill="#3f3f46"
                stroke="#00c951"
                stackId="a"
              />

              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default TasksHistoryChart;

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

type Props = {
  data: { month: string; tasks: number }[];
};
const TasksConcludedByMonthCharts = ({ data }: Props) => {
  return (
    <Card>
      <CardHeader className="border-b px-5">
        <CardTitle className="text-lg">Activities Per Month</CardTitle>
        <CardDescription>
          Showing the amount of tasks completed in every month
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            month: {
              label: "concluded",
              color: "#00c951",
            },
          }}
          className="min-h-[200px] h-full w-full"
        >
          <BarChart accessibilityLayer data={data} height={300} width={200}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />

            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="tasks" fill="#00c951" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default TasksConcludedByMonthCharts;

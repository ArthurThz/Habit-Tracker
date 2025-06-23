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
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

type Props = {
  tasks: { name: string; count: number }[];
};

const MostFrequentTasksByName = ({ tasks }: Props) => {
  return (
    <Card className="w-1/2">
      <CardHeader>
        <CardTitle>Your most frequent tasks</CardTitle>
        <CardDescription>
          see the tasks that you have started more times
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            tasks: {
              label: "Task",
              color: "#00c951",
            },
          }}
        >
          <BarChart
            accessibilityLayer
            data={tasks}
            layout="vertical"
            margin={{
              right: 16,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="name"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              hide
            />
            <XAxis dataKey="count" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar dataKey="count" layout="vertical" fill="#00c951" radius={4}>
              <LabelList
                dataKey="count"
                position="insideLeft"
                offset={8}
                className="fill-(--color-label)"
                fontSize={12}
              />
              <LabelList
                dataKey="name"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default MostFrequentTasksByName;

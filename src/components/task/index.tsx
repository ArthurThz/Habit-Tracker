import { Calendar } from "lucide-react";
import NavigateButton from "../navigate-button";
import { Card, CardHeader, CardContent } from "../ui/card";
import Timer from "../timer";

type Props = {
  id: number;
  name: string;
};

const Task = ({ id, name }: Props) => {
  const todayDate = new Date();
  return (
    <Card className="min-h-1/2 h-full lg:h-auto w-full lg:max-w-1/4">
      <CardHeader>
        <NavigateButton label="My Tasks" path="/tasks" />
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-quantico">{name}</h1>
          <p className="font-quantico text-lg">
            Every new habit starts with{" "}
            <span className="text-green-500">discipline</span> and{" "}
            <span className="text-green-500">consistency</span> — keep working
            hard!
          </p>
          <p className="font-quantico text-sm">
            After stopping the timer, your progress will be saved and turned
            into <span className="text-green-500">insights</span> to show your{" "}
            <span className="text-green-500">improvement</span>
          </p>
          <div className="flex items-center gap-2">
            <Calendar />
            <h2>{todayDate.toDateString()}</h2>
          </div>
        </div>
        <div className="mt-8">
          <Timer taskId={id} />
        </div>
      </CardContent>
    </Card>
  );
};

export default Task;

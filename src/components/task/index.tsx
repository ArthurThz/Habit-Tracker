import { Atom, Calendar } from "lucide-react";
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
    <Card className="min-h-1/2 h-full lg:h-auto w-full lg:max-w-1/3">
      <CardHeader>
        <NavigateButton label="My Tasks" path="/tasks" />
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col">
          <h1 className="text-4xl font-quantico">Habit Tracker</h1>
          <p>
            Every new habit starts with{" "}
            <span className="text-green-500">discipline</span> and{" "}
            <span className="text-green-500">recurrence</span> keep working
            hard!
          </p>
        </div>

        <div>
          <div key={id}>
            <div className="flex items-center gap-2">
              <Atom />
              <p className="text-3xl">{name}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Calendar />
          <h2>{todayDate.toDateString()}</h2>
        </div>
        <div className="mt-8">
          <Timer taskId={id} />
        </div>
      </CardContent>
    </Card>
  );
};

export default Task;

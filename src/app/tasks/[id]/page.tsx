"use client";
import Loader from "@/components/loader";
import PreviousPageButton from "@/components/navigate-button";
import Timer from "@/components/timer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useTaskById } from "@/hooks/react-query/useTaskById";
import { Tasks } from "@/types/tasks";
import { Atom, Calendar } from "lucide-react";
import { useParams } from "next/navigation";

const TaskPage = () => {
  const params = useParams();
  const parsedId = parseInt(params.id as string);
  const { data: taskById, isLoading } = useTaskById({ id: parsedId });
  const todayDate = new Date();

  if (isLoading) return <Loader />;
  return (
    <div className="flex items-center justify-center flex-col h-screen w-full gap-4">
      <Card className="min-h-1/2 h-auto max-w-1/3">
        <CardHeader>
          <PreviousPageButton label="Your Tasks" />
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

          <div className="">
            {taskById.map((item: Tasks) => (
              <div key={item.id}>
                <div className="flex items-center gap-2">
                  <Atom />
                  <p className="text-3xl">{item.name}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Calendar />
            <h2>{todayDate.toDateString()}</h2>
          </div>
          <div className="mt-8">
            <Timer taskId={parsedId} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskPage;

import { Tasks } from "@/hooks/useTasks";
import { formatDate } from "@/lib/formatDate";
import { Button } from "../ui/button";

const TaskPreview = ({ createdat, id, name, userId }: Tasks) => {
  return (
    <div className="w-full min-h-[250px] justify-center border hover:border-zinc-50 flex gap-4 flex-col items-center rounded-md border-zinc-800 bg-zinc-900 p-4">
      <h3 className="text-xl font-quantico">{name}</h3>
      <p>Created At: {formatDate(createdat)}</p>
      <Button className="bg-white hover:cursor-pointer">Start Task</Button>
    </div>
  );
};

export default TaskPreview;

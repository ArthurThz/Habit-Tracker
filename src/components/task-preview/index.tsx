import { Tasks } from "@/types/tasks";
import { formatDate } from "@/lib/formatDate";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { ClockPlus, Trash } from "lucide-react";
import { useDeleteTask } from "@/hooks/react-query/useDeleteTask";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

const TaskPreview = ({ createdat, id, name }: Tasks) => {
  const navigate = useRouter();

  const deleteTask = useDeleteTask();

  const handleNavigate = () => {
    navigate.push(`/tasks/${id}`);
  };

  const queryClient = useQueryClient();

  const handleDeleteTask = () => {
    deleteTask.mutate(String(id), {
      onSuccess: () => {
        queryClient.setQueryData(
          ["tasks"],
          (oldTasksArr: Tasks[] | undefined) => {
            return oldTasksArr
              ? oldTasksArr.filter((item) => item.id !== id)
              : [];
          }
        );
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
        toast.success("Task removed");
      },
      onError: () => {
        toast.error("Can't delete the task");
      },
    });
  };
  return (
    <div className="w-full h-[400px] lg:w-[400px] lg:h-[350px] justify-center border hover:border-zinc-50 flex gap-4 flex-col items-center rounded-md border-zinc-800 bg-zinc-900 p-4">
      <h3 className="text-xl font-quantico">{name}</h3>
      <p>Created At: {formatDate(createdat)}</p>
      <Button
        onClick={handleNavigate}
        className="bg-white hover:cursor-pointer min-w-1/2"
      >
        <ClockPlus />
        Start Task
      </Button>
      <Button
        onClick={handleDeleteTask}
        variant="secondary"
        className="hover:cursor-pointer bg-zinc-700 min-w-1/2"
      >
        <Trash />
        Remove Task
      </Button>
    </div>
  );
};

export default TaskPreview;

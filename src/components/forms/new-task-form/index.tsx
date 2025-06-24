"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCreateTask } from "@/hooks/react-query/useCreateTask";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2, { message: "field can't be empty" }),
});
const NewTaskForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const createTask = useCreateTask();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    createTask.mutate(
      { taskName: values.name },
      {
        onSuccess: (data) => {
          console.log("Task create Sucessfully", data);
          toast.success("Task create sucessfully");
          form.reset();
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };
  return (
    <div className="max-w-[350px] max-h-1/2 flex flex-col gap-4 h-full mt-2">
      <h1 className="font-quantico text-4xl text-center  ">
        Fill the form to add a new task
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="border border-zinc-800 rounded-md p-4 flex flex-col gap-4 bg-zinc-900"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Create task</FormLabel>
                <FormControl>
                  <Input placeholder="task name" {...field} />
                </FormControl>
                <FormDescription>
                  <span className="text-green-500 font-medium font-quantico">
                    little reminder:{" "}
                  </span>{" "}
                  {`New habits cant take 60 days to develop. Dont't give up!`}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <Button
            disabled={form.formState.isSubmitting}
            className="bg-white hover:cursor-pointer"
          >
            {form.formState.isSubmitting ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "Confirm"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default NewTaskForm;

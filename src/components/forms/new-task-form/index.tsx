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
import { createTask } from "@/lib/neon";
import { zodResolver } from "@hookform/resolvers/zod";
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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await createTask({
      taskName: values.name,
      userId: 1,
    });
    toast.success("Task sucessfully created!");
    form.reset();
  };
  return (
    <div className="max-w-[350px] max-h-1/2 h-full mt-8">
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
                  new habits can take 60 days to be developed do not give up!
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <Button className="bg-white hover:cursor-pointer">Confirm</Button>
        </form>
      </Form>
    </div>
  );
};

export default NewTaskForm;

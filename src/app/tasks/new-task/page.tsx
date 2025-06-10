import NewTaskForm from "@/components/forms/new-task-form";

const NewTaskPage = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center p-4 gap-4">
      <h1 className="font-quantico text-4xl text-center lg:text-start ">
        Fill the form to add a new task
      </h1>
      <NewTaskForm />
    </div>
  );
};

export default NewTaskPage;

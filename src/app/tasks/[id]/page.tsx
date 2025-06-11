type Props = {
  params: {
    id: string;
  };
};

const TaskPage = ({ params }: Props) => {
  const { id } = params;
  return (
    <div className="">
      <p>{id}</p>
    </div>
  );
};

export default TaskPage;

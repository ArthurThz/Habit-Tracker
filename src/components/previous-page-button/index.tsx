import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

type Props = {
  label: string;
  icon?: ReactNode;
};

const PreviousPageButton = ({ label, icon }: Props) => {
  const navigate = useRouter();
  return (
    <button
      onClick={() => navigate.back()}
      className="flex items-center  hover:underline hover:cursor-pointer underline-offset-2"
    >
      {icon ? icon : <ChevronLeft />}
      <span>{label}</span>
    </button>
  );
};

export default PreviousPageButton;

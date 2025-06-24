import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

type Props = {
  label: string;
  icon?: ReactNode;
  path: string;
};

const NavigateButton = ({ label, icon, path }: Props) => {
  const navigate = useRouter();
  return (
    <button
      onClick={() => navigate.push(path)}
      className="flex items-center hover:underline hover:cursor-pointer underline-offset-2"
    >
      {icon ? icon : <ChevronLeft />}
      <span>{label}</span>
    </button>
  );
};

export default NavigateButton;

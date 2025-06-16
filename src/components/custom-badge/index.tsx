import { Badge } from "../ui/badge";
import { ReactNode } from "react";

type Props = {
  title: string;
  content: string;
  icon?: ReactNode;
};
const CustomBadge = ({ content, title, icon }: Props) => {
  return (
    <Badge
      variant="secondary"
      className="text-sm py-4 px-8 flex flex-col gap-2 "
    >
      <div className="flex gap-2 items-center">
        {icon} <span>{title}</span>
      </div>
      <span>{content}</span>
    </Badge>
  );
};

export default CustomBadge;

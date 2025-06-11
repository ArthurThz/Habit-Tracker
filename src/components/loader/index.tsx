import { LoaderCircle } from "lucide-react";
import { ReactNode } from "react";

const Loader = ({ icon }: { icon?: ReactNode }) => {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      {icon ? (
        icon
      ) : (
        <LoaderCircle className="text-white animate-spin" size={30} />
      )}
    </div>
  );
};

export default Loader;

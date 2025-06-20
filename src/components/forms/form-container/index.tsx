import Image from "next/image";
import { ReactNode } from "react";

type Props = {
  image?: string;
  title: string;
  subtitle: string;
  children: ReactNode;
  errorMessage?: string | null;
};
const FormContainer = ({
  children,
  subtitle,
  title,
  image,
  errorMessage,
}: Props) => {
  return (
    <div className=" w-auto max-w-[400px] h-auto p-4 flex flex-col items-center gap-4">
      <div className="w-full h-auto rounded-lg flex items-center justify-center">
        {image && (
          <Image src={image} alt="login image" width={250} height={250} />
        )}
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-medium font-quantico">{title}</h1>
        <p className="font-semibold text-sm text-neutral-300">
          {/* Log in with your email and password to continue */}
          {subtitle}
        </p>
      </div>
      {errorMessage && (
        <span className="text-red-400 text-sm">{errorMessage}</span>
      )}
      {children}
    </div>
  );
};

export default FormContainer;

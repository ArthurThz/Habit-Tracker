"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import Image from "next/image";

type Props = {
  title: string;
  contentDescription: string;
  buttonLabel: string;
  cardImage: string;
  linkTo: string;
};
const ContentPreview = ({
  buttonLabel,
  cardImage,
  contentDescription,
  title,
  linkTo,
}: Props) => {
  const navigate = useRouter();
  const handleNavigate = () => {
    navigate.push(linkTo);
  };
  return (
    <div className="flex min-h-[50vh] h-auto w-full lg:h-[60vh] lg:w-[400px] flex-col gap-4 py-4 px-2">
      <h1 className="text-3xl font-quantico font-bold text-zinc-300">
        {title}
      </h1>
      <div className="group flex h-full w-full flex-col gap-4 rounded-sm border border-zinc-700 bg-zinc-900 p-8 transition-all  ease-in-out hover:cursor-pointer hover:items-center hover:justify-center hover:bg-zinc-800">
        <h3 className="ease text-lg font-medium text-zinc-300 transition-all  group-hover:hidden">
          {contentDescription}
        </h3>
        <Image
          src={cardImage}
          className="opacity-90 lg:group-hover:hidden"
          alt="image preview"
          width={400}
          height={200}
        />
        <Button variant="contentPreview" size="lg" onClick={handleNavigate}>
          {buttonLabel}
        </Button>
      </div>
    </div>
  );
};

export default ContentPreview;

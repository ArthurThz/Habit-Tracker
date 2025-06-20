"use client";

import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  return (
    <div className="w-full bg-zinc-950 z-20 fixed p-4 border-b-1 flex items-center gap-2 border-b-zinc-500/30 max-h-1/5 lg:py-8">
      <h1
        onClick={() => router.push("/")}
        className="text-3xl font-quantico cursor-pointer lg:text-4xl "
      >
        Habit Tracker
      </h1>
    </div>
  );
};

export default Header;

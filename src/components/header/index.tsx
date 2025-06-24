"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useGetUserSession } from "@/hooks/useGetUserSession";

const Header = () => {
  const router = useRouter();
  const { isAuthenticated } = useGetUserSession();

  const redirectRoute = isAuthenticated ? "/home" : "/";

  return (
    <div className="w-full bg-zinc-950 z-20 fixed p-4 border-b-1 flex items-center justify-between gap-2 border-b-zinc-500/30 max-h-1/5 lg:py-8">
      <h1
        onClick={() => router.push(redirectRoute)}
        className="text-2xl font-quantico cursor-pointer lg:text-4xl"
      >
        Habit Tracker
      </h1>
      {isAuthenticated && (
        <Button
          className="hover:cursor-pointer"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          Log Out
        </Button>
      )}
    </div>
  );
};

export default Header;

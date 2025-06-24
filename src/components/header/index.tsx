"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const Header = () => {
  const router = useRouter();
  const session = useSession();

  const redirectRoute = session.status === "unauthenticated" ? "/" : "/home";

  return (
    <div className="w-full bg-zinc-950 z-20 fixed p-4 border-b-1 flex items-center justify-between gap-2 border-b-zinc-500/30 max-h-1/5 lg:py-8">
      <h1
        onClick={() => router.push(redirectRoute)}
        className="text-3xl font-quantico cursor-pointer lg:text-4xl"
      >
        Habit Tracker
      </h1>
      {session.status === "authenticated" && (
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

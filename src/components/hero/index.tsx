"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

const HeroSection = () => {
  const navigate = useRouter();

  return (
    <div className="w-full min-h-screen h-screen">
      <div className=" h-full lg:h-2/3 w-full flex lg:flex-row flex-col-reverse gap-8 lg:gap-0 justify-center items-center p-8">
        <div className="flex flex-col lg:w-1/2 gap-8 justify-center">
          <h1 className="text-4xl  tracking-tight lg:text-7xl font-bold font-quantico lg:w-2/3">
            Welcome to the <span className="text-green-500">Habit Tracker</span>
            , here you are going improve your{" "}
            <span className="text-green-500">personal growing</span>.
          </h1>
          <div className="flex gap-4 justify-center lg:justify-start">
            <Button
              variant="heroPrimary"
              onClick={() => navigate.push("/auth/login")}
            >
              Access App
            </Button>
            <Button
              variant="heroSecondary"
              onClick={() => signOut({ callbackUrl: "/auth/signup" })}
            >
              Sign Up
            </Button>
          </div>
        </div>
        <div className="">
          <Image
            className="w-[300px] lg:w-[500px]"
            src="./hero.svg"
            alt="hero image"
            width={600}
            height={300}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

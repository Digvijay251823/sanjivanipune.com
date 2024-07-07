"use client";
import LoadingSkeleton from "@/Utils/LoadingSkeleton";
import { useGlobalState } from "@/Utils/State";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

function NotFound() {
  const navigator = useRouter();
  const { state } = useGlobalState();

  return (
    <div className="h-screen w-screen flex md:flex-row flex-col items-center justify-center bg-white">
      <div className="flex flex-col items-center">
        <Image
          src={
            "https://res.cloudinary.com/dko1ffxgt/image/upload/v1712426471/3828537-removebg-preview_mnynd8.png"
          }
          alt="404"
          priority
          height={300}
          quality={100}
          width={300}
          className="md:h-screen w-auto"
        />
      </div>
      <div className="text-black mx-5">
        <p className="font-bold text-4xl text-center">Not Found</p>
        <p className="text-center">
          page you are looking for might not exist please contact counselor to
          get the correct url
        </p>
      </div>
    </div>
  );
}

export default NotFound;

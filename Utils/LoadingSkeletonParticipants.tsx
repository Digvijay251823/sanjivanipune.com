"use client";
import { PhotoIcon } from "@heroicons/react/16/solid";
import React from "react";
import { useGlobalState } from "./State";

function LoadingSkeletonParticipants() {
  const { state } = useGlobalState();
  return (
    <div className="flex lg:flex-row flex-col h-screen items-center overflow-y-hidden">
      <div className="md:h-full lg:fixed top-0">
        <div className="md:ml-20 flex flex-col gap-3 mx-5">
          <div
            className={`md:mt-20 mt-10 animate-pulse md:h-16 h-14 rounded-full w-[250px] ${
              state.theme.theme === "LIGHT" ? "bg-gray-300" : "bg-stone-700"
            }`}
          ></div>
          <div
            className={`animate-pulse lg:w-[500px] h-5 rounded-full w-[90vw] ${
              state.theme.theme === "LIGHT" ? "bg-gray-300" : "bg-stone-700"
            }`}
          ></div>
          <div
            className={`mt-5 animate-pulse md:h-16 h-14 rounded-full w-[250px] ${
              state.theme.theme === "LIGHT" ? "bg-gray-300" : "bg-stone-700"
            }`}
          ></div>
          <div
            className={`animate-pulse lg:w-[500px] h-40 rounded-3xl lg:hidden ${
              state.theme.theme === "LIGHT" ? "bg-gray-300" : "bg-stone-700"
            }`}
          ></div>
        </div>
        <div
          className={`flex md:h-full lg:w-[40vw] w-full lg:ml-20 animate-pulse mt-5 rounded-[40px] ${
            state.theme.theme === "LIGHT" ? "bg-gray-300" : "bg-stone-700"
          }`}
        ></div>
      </div>
      <div className="lg:w-[40vw] w-full p-3 lg:ml-[50vw]">
        <div
          className={`w-full px-5 rounded-[40px] py-5 animate-pulse h-[500px] ${
            state.theme.theme === "LIGHT" ? "bg-gray-200 " : "bg-stone-800"
          }`}
        ></div>
      </div>
    </div>
  );
}

export default LoadingSkeletonParticipants;

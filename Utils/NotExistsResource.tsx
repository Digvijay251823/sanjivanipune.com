"use client";
import React from "react";
import { useGlobalState } from "./State";

function NotExistsResource({ message }: { message: string }) {
  const { state } = useGlobalState();
  return (
    <div
      className={`h-screen flex flex-col items-center justify-center w-screen gap-5 ${
        state.theme.theme === "LIGHT" ? "bg-white" : "bg-stone-950"
      }`}
    >
      <p className="font-bold text-4xl text-center">404</p>
      <p className="font-bold text-4xl text-center">{message}</p>
      <p className="text-lg">please contact your counselor</p>
    </div>
  );
}

export default NotExistsResource;

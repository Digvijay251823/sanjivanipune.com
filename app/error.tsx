"use client"; // Error components must be Client Components

import { useGlobalState } from "@/Utils/State";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { state } = useGlobalState();
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div
      className={`h-screen w-full flex items-center justify-center ${
        state.theme.theme === "LIGHT" ? "bg-white" : "bg-stone-950"
      }`}
    >
      <div className="flex flex-col items-center gap-5">
        <h1 className="text-[70px] font-bold">OOPS!</h1>
        <h2 className="font-bold text-xl">Something went wrong!</h2>
        {error?.message && (
          <p className="px-5 py-1.5 bg-red-400 text-white font-semibold text-lg rounded-full">
            MESSAGE : {error.message}
          </p>
        )}
        <button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
          className={` text-white px-5 py-2 font-bold text-lg ${
            state.theme.theme === "LIGHT" ? "bg-purple-500" : "bg-purple-500"
          }`}
        >
          Try again
        </button>
      </div>
    </div>
  );
}

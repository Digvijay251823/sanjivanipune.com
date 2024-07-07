"use client";
import FilterIcon from "@/Utils/Icons/FilterIcon";
import { useGlobalState } from "@/Utils/State";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function ClearFilter() {
  const { state } = useGlobalState();
  const pathname = usePathname();

  return (
    <div className="absolute right-0 mt-10 mr-10 px-4 py-2">
      <Link href={`${pathname}?sort=id&page=0&size=10`}>
        <button
          className={`flex items-center px-4 py-2 rounded-xl font-semibold text-lg text-blue-600 ${
            state.theme.theme === "LIGHT"
              ? "bg-blue-100"
              : "bg-blue-950 bg-opacity-30"
          }`}
        >
          Clear Filter <FilterIcon />
        </button>
      </Link>
    </div>
  );
}

export default ClearFilter;

"use client";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useGlobalState } from "./State";
import Link from "next/link";

function Pagination({ totalElements }: { totalElements: number }) {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { state } = useGlobalState();
  const [VisibleElements, setVisibleElement] = useState<number>(10);

  useEffect(() => {
    const searchParamsUrl = Object.fromEntries(
      new URLSearchParams(searchParams)
    );

    const page = searchParamsUrl?.page ? Number(searchParamsUrl?.page) : 0;
    const pageNumber = currentPage + 1;
    setVisibleElement(pageNumber * 10);
    setCurrentPage(page);
  }, [searchParams, currentPage]);

  return (
    <div className="flex items-center justify-between gap-5 p-5">
      {VisibleElements !== 10 ? (
        <Link
          href={{
            pathname,
            query: {
              ...Object.fromEntries(new URLSearchParams(searchParams)),
              page: currentPage - 1,
            },
          }}
          onClick={() => setVisibleElement((prev) => prev - 10)}
        >
          <p
            className={`${
              state.theme.theme === "LIGHT"
                ? "bg-blue-100 rounded-full p-2 text-blue-600"
                : "bg-blue-950 rounded-full p-2 bg-opacity-40 text-blue-600"
            }`}
          >
            <ChevronLeftIcon className="h-8 w-8" />
          </p>
        </Link>
      ) : (
        <p
          className={`${
            state.theme.theme === "LIGHT"
              ? "bg-stone-100 rounded-full text-stone-400 p-2"
              : "bg-stone-900 rounded-full text-stone-600 p-2"
          }`}
        >
          <ChevronLeftIcon className="h-8 w-8" />
        </p>
      )}
      <p className="px-2 py-1 text-xl">{`${
        totalElements < 10
          ? totalElements
          : VisibleElements > totalElements
          ? totalElements
          : VisibleElements
      } of ${totalElements}`}</p>
      {VisibleElements > totalElements ? (
        <p
          className={`${
            state.theme.theme === "LIGHT"
              ? "bg-stone-100 rounded-full text-stone-400 p-2"
              : "bg-stone-900 rounded-full text-stone-600 p-2"
          }`}
        >
          <ChevronRightIcon className="h-8 w-8" />
        </p>
      ) : (
        <Link
          href={{
            pathname,
            query: {
              ...Object.fromEntries(new URLSearchParams(searchParams)),
              page: currentPage + 1,
            },
          }}
          onClick={() => setVisibleElement((prev) => prev + 10)}
        >
          <p
            className={`${
              state.theme.theme === "LIGHT"
                ? "bg-blue-100 rounded-full p-2 text-blue-600"
                : "bg-blue-950 rounded-full p-2 bg-opacity-40 text-blue-600"
            }`}
          >
            <ChevronRightIcon className="h-8 w-8" />
          </p>
        </Link>
      )}
    </div>
  );
}

export default Pagination;

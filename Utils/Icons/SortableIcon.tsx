import { ChevronUpDownIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";
interface SortableProp {
  fieldName?: string;
  tableHeading: string;
  isSorted: boolean;
}

function SortableIcon({ fieldName, tableHeading, isSorted }: SortableProp) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const urlSearchParams = Object.fromEntries(new URLSearchParams(searchParams));
  const unsorted: any = {
    ...urlSearchParams,
    sort: "id",
  };
  const prevQry: any = {
    ...urlSearchParams,
  };
  const queryStr: any = {
    ...urlSearchParams,
    sort: fieldName,
  };
  const prevQueryString = Object.keys(prevQry)
    .map(
      (key) => encodeURIComponent(key) + "=" + encodeURIComponent(queryStr[key])
    )
    .join("&");
  const unsortedQuery = Object.keys(unsorted)
    .map(
      (key) => encodeURIComponent(key) + "=" + encodeURIComponent(unsorted[key])
    )
    .join("&");

  return (
    <span
      className={`flex items-center justify-center cursor-pointer ${
        isSorted ? "text-blue-600" : ""
      }`}
    >
      <p>{tableHeading}</p>
      <Link
        href={
          !isSorted
            ? `${pathname}?${prevQueryString}`
            : `${pathname}?${unsortedQuery}`
        }
      >
        <button>
          <ChevronUpDownIcon className="h-4 w-4" />
        </button>
      </Link>
    </span>
  );
}

export default SortableIcon;

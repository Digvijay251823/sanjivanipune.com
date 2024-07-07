import { SERVER_ENDPOINT } from "@/ConfigFetch";
import Levels from "@/components/Modules/Information/levels/Levels";
import { unstable_noStore } from "next/cache";
import React from "react";
import PageNavigation from "@/Utils/Pagination";

async function getLevel(queryString: string) {
  unstable_noStore();
  const response = await fetch(`${SERVER_ENDPOINT}/level/?${queryString}`);
  if (response.ok) {
    const responseData = await response.json();
    return responseData;
  } else {
    const errorData = await response.json();
    throw new Error(errorData.message || errorData.statusText);
  }
}

async function page({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const queryString = new URLSearchParams(searchParams).toString();
  const response = await getLevel(queryString);

  return (
    <div className="w-full">
      <Levels response={response} />
      <PageNavigation totalElements={response.totalElements} />
    </div>
  );
}

export default page;

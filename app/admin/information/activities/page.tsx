import { SERVER_ENDPOINT } from "@/ConfigFetch";
import Activities from "@/components/Modules/Information/activities/Activities";
import { unstable_noStore } from "next/cache";
import React from "react";
import PageNavigation from "@/Utils/Pagination";

async function getActivities(queryString: string) {
  unstable_noStore();
  const response = await fetch(
    `${SERVER_ENDPOINT}/participant-activity/filter/?${queryString}`
  );
  if (response.ok) {
    const responseData = await response.json();
    console.log(responseData);
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
  const response = await getActivities(queryString);
  return (
    <div>
      <Activities response={response} />
      <PageNavigation totalElements={response.totalElements} />
    </div>
  );
}

export default page;

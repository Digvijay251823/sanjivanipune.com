import { SERVER_ENDPOINT } from "@/ConfigFetch";
import Participants from "@/components/Modules/Information/participants/Participants";
import { unstable_noStore } from "next/cache";
import React from "react";
import PageNavigation from "@/Utils/Pagination";

async function getParticipant(queryString: string) {
  unstable_noStore();

  const response = await fetch(
    `${SERVER_ENDPOINT}/participant/?${queryString}`
  );
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
  const response = await getParticipant(queryString);
  return (
    <div>
      <Participants response={response} />

      <PageNavigation totalElements={response.totalElements} />
    </div>
  );
}

export default page;

import { SERVER_ENDPOINT } from "@/ConfigFetch";
import Sadhana from "@/components/Modules/Information/sadhana/Sadhana";
import React from "react";
import PageNavigation from "@/Utils/Pagination";
import { unstable_noStore } from "next/cache";

async function getSadhana(queryString: string) {
  unstable_noStore();
  const response = await fetch(
    `${SERVER_ENDPOINT}/participant-sadhana/filter/?${queryString}`
  );
  if (response.ok) {
    const responseData = await response.json();
    return responseData;
  } else {
    const errorData = await response.json();
    throw errorData;
  }
}

async function page({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const queryString = new URLSearchParams(searchParams).toString();
  const response = await getSadhana(queryString);
  return (
    <div>
      <Sadhana response={response} />
      <PageNavigation totalElements={response.totalElements} />
    </div>
  );
}

export default page;

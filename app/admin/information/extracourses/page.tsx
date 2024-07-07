import Extracourses from "@/components/Modules/Information/extracourses/ExtraCourses";
import React from "react";
import PageNavigation from "@/Utils/Pagination";
import { unstable_noStore } from "next/cache";
import { SERVER_ENDPOINT } from "@/ConfigFetch";

async function getExtraCourses(queryString: string) {
  unstable_noStore();
  const response = await fetch(
    `${SERVER_ENDPOINT}/participant-registration/filter/?${queryString}`
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
  const response = await getExtraCourses(queryString);
  return (
    <div>
      <Extracourses response={response} />
      {<PageNavigation totalElements={response?.totalElements} />}
    </div>
  );
}

export default page;

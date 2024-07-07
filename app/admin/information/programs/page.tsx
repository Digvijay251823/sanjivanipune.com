import { SERVER_ENDPOINT } from "@/ConfigFetch";

import Programs from "@/components/Modules/Information/programs/Programs";
import { unstable_noStore } from "next/cache";
import React from "react";
import PageNavigation from "@/Utils/Pagination";

async function getProgram(queryString: string) {
  unstable_noStore();
  const response = await fetch(`${SERVER_ENDPOINT}/program/?${queryString}`);
  if (response.ok) {
    const responseData = await response.json();
    return responseData;
  } else {
    const errorData = await response.json();
    return { error: errorData.message || errorData.statusText };
  }
}

async function page({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const queryString = new URLSearchParams(searchParams).toString();
  const response = await getProgram(queryString);
  return (
    <div className="w-full">
      <Programs response={response} />
      <PageNavigation totalElements={response.totalElements} />
    </div>
  );
}

export default page;

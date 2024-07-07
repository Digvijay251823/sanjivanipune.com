import { SERVER_ENDPOINT } from "@/ConfigFetch";
import Volunteers from "@/components/Modules/Information/volunteers/Volunteers";
import { unstable_noStore } from "next/cache";
import React from "react";
import PageNavigation from "@/Utils/Pagination";
import Modal from "@/Utils/Modal";

async function getVolunteers(queryString: string) {
  unstable_noStore();
  const response = await fetch(`${SERVER_ENDPOINT}/volunteer/?${queryString}`);
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
  const response = await getVolunteers(queryString);
  return (
    <div>
      <Volunteers response={response} />
      <PageNavigation totalElements={response.totalElements} />
    </div>
  );
}

export default page;

import { SERVER_ENDPOINT } from "@/ConfigFetch";
import CoursesMaster from "@/components/Modules/Information/mcourses/MasterCourses";
import { unstable_noStore } from "next/cache";
import React from "react";
import PageNavigation from "@/Utils/Pagination";

async function getCourses(queryString: string) {
  unstable_noStore();
  const response = await fetch(`${SERVER_ENDPOINT}/session/?${queryString}`);
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
  const response = await getCourses(queryString);
  return (
    <div>
      <CoursesMaster response={response} />
      <PageNavigation totalElements={response.totalElements} />
    </div>
  );
}

export default page;

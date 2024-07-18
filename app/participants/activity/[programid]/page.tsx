import { SERVER_ENDPOINT } from "@/ConfigFetch";
import NotExistsResource from "@/Utils/NotExistsResource";
import Activities from "@/components/Participants/Activities";
import { unstable_noStore } from "next/cache";
import React from "react";

async function getActivities() {
  unstable_noStore();
  const response = await fetch(`${SERVER_ENDPOINT}/activity/`);
  if (response.ok) {
    const responseData = await response.json();
    return responseData;
  } else {
    const errorData = await response.json();
    throw new Error(errorData.message || errorData.statusText);
  }
}
async function getProgram(programId: string) {
  const response = await fetch(`${SERVER_ENDPOINT}/program/id/${programId}`);
  if (response.ok) {
    const responseData = await response.json();

    return responseData;
  } else {
    if (response.status === 404) {
      return null;
    }
    const errorData = await response.json();
    throw new Error(errorData.message || errorData.statusText);
  }
}

async function page({ params }: { params: { programid: string } }) {
  const response = await getProgram(params.programid);
  const responseActivity = await getActivities();

  if (!response) {
    return <NotExistsResource message="This program might not exists" />;
  }

  if (responseActivity?.length > 0) {
    return <NotExistsResource message="No Activities To Show" />;
  }

  return (
    <div>
      <Activities response={response} activity={responseActivity} />
    </div>
  );
}

export default page;

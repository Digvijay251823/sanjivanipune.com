import { SERVER_ENDPOINT } from "@/ConfigFetch";
import ChantingRoundWise from "@/components/Modules/Dashboard/ChantingRoundWise";
import { unstable_noStore } from "next/cache";
import React from "react";
async function getChantingCount() {
  unstable_noStore();
  const response = await fetch(
    `${SERVER_ENDPOINT}/participant/stats/japa-rounds-participant-count`
  );
  if (response.ok) {
    const responseData = await response.json();
    return responseData;
  } else {
    const errorData = await response.json();
    throw new Error(errorData.message || errorData.statusText);
  }
}

async function page() {
  const response = await getChantingCount();
  return (
    <div>
      <ChantingRoundWise response={response} />
    </div>
  );
}

export default page;

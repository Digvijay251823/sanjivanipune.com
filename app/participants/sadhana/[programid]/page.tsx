import React from "react";
import { SERVER_ENDPOINT } from "@/ConfigFetch";
import SadhanaForm from "@/components/Participants/Sadhana";
import NotExistsResource from "@/Utils/NotExistsResource";
import { unstable_noStore } from "next/cache";

async function getProgram(programId: string) {
  unstable_noStore();
  try {
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
  } catch (error: any) {
    throw new Error(error.message || error.statusText);
  }
}
async function getSadhanaForm(programId: string) {
  const response = await fetch(
    `${SERVER_ENDPOINT}/sadhana-form/id/${programId}`
  );
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
  if (!response) {
    return <NotExistsResource message="This Program might not exist" />;
  }
  const sadhana = await getSadhanaForm(response.sadhanaForm);

  if (!sadhana) {
    return (
      <NotExistsResource message="Sadhana Form for this program might not be configured" />
    );
  }

  return (
    <div className="h-full">
      <SadhanaForm response={response} sadhanaForm={sadhana} />
    </div>
  );
}

export default page;

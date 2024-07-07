import { SERVER_ENDPOINT } from "@/ConfigFetch";
import NotExistsResource from "@/Utils/NotExistsResource";
import SadhanaForm from "@/components/Modules/Information/programs/sadhana/SadhanaForm";
import { unstable_noStore } from "next/cache";
import React from "react";

async function getSadhanaForm(programId: string) {
  unstable_noStore();
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
  async function GetProgramDetails() {
    unstable_noStore();
    const response = await fetch(
      `${SERVER_ENDPOINT}/program/id/${params.programid}`
    );
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      if (response.status === 404) {
        return (
          <NotExistsResource message="This program might not exist please check" />
        );
      }
      const errorData = await response.json();
      return errorData;
    }
  }
  const response = await GetProgramDetails();

  const sadhanaResponse = await getSadhanaForm(response.sadhanaForm);

  return (
    <div>
      <SadhanaForm response={response} sadhanaResponse={sadhanaResponse} />
    </div>
  );
}

export default page;

import { SERVER_ENDPOINT } from "@/ConfigFetch";
import NotExistsResource from "@/Utils/NotExistsResource";
import ExtraCourseRegisteration from "@/components/Participants/ExtraCourseRegisteration";
import ExtraCourseRegisterationSelectedLevel from "@/components/Participants/ExtraCourseRegisterationSelectedLevel";
import React from "react";

async function getLevel(levelId: string) {
  const response = await fetch(`${SERVER_ENDPOINT}/level/id/${levelId}`);
  if (response.ok) {
    const responseData = await response.json();
    return responseData;
  } else {
    if (response.status === 404) {
      return null;
    }
    const errorData = await response.json();
    throw new Error(errorData.message);
  }
}

async function page({ params }: { params: { levelid: string } }) {
  const response = await getLevel(params.levelid);
  if (!response) {
    return <NotExistsResource message="This Program doesnt exist" />;
  }
  if (response.acceptingNewParticipants) {
    return (
      <div>
        <ExtraCourseRegisterationSelectedLevel response={response} />
      </div>
    );
  } else {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <h2 className="font-bold text-3xl">
          This program is not accepting participants any more
        </h2>
      </div>
    );
  }
}

export default page;

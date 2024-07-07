import { SERVER_ENDPOINT } from "@/ConfigFetch";
import NotExistsResource from "@/Utils/NotExistsResource";
import Rsvp from "@/components/Participants/Rsvp";
import React from "react";

async function getScheduledSessions(levelId: string) {
  const response = await fetch(
    `${SERVER_ENDPOINT}/session/scheduled/level/${levelId}?sort=startTime,desc`
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
    throw new Error(errorData.message || errorData.statusText);
  }
}

async function page({ params }: { params: { levelid: string } }) {
  const response = await getScheduledSessions(params.levelid);
  const responseLevel = await getLevel(params.levelid);

  if (!responseLevel) {
    return <NotExistsResource message="This level doesn't exist" />;
  }

  if (!response || response.content.length === 0) {
    return <NotExistsResource message="No Scheduled sessions for this level" />;
  }
  return (
    <div>
      <Rsvp response={response} level={responseLevel} />
    </div>
  );
}

export default page;

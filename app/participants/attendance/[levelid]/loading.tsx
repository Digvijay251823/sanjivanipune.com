import LoadingSkeletonParticipants from "@/Utils/LoadingSkeletonParticipants";
import React from "react";

function loading() {
  return (
    <div className="mt-5">
      <LoadingSkeletonParticipants />
    </div>
  );
}

export default loading;

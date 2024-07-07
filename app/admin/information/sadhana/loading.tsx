import LoadingSkeleton from "@/Utils/LoadingSkeleton";
import React from "react";

function loading() {
  return (
    <div className="mt-5">
      <LoadingSkeleton columns={10} rows={8} />
    </div>
  );
}

export default loading;

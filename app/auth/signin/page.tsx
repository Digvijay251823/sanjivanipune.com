import dynamic from "next/dynamic";
import React from "react";
import SignIn from "@/components/auth/SignIn";

function page() {
  return (
    <div className="w-full">
      <SignIn />
    </div>
  );
}

export default page;

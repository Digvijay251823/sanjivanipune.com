import React, { useEffect } from "react";
import { useGlobalState } from "./State";
import { useFormStatus } from "react-dom";
import LoadingComponent from "./Icons/LoadingComponent";

function SubmitHandlerButton() {
  const { state } = useGlobalState();
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <div
          className={`text-blue-600 font-semibold text-xl w-full py-2 rounded-xl flex justify-center`}
        >
          <LoadingComponent />
        </div>
      ) : (
        <button
          type="submit"
          className={`text-blue-600 font-semibold text-xl w-full py-2 rounded-xl ${
            state.theme.theme === "LIGHT"
              ? "bg-blue-50 "
              : "bg-blue-900 bg-opacity-20"
          }`}
          disabled={pending}
        >
          Submit
        </button>
      )}
    </>
  );
}

export default SubmitHandlerButton;

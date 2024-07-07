import React from "react";
import { useGlobalState } from "../State";

function FilterIcon() {
  const { state } = useGlobalState();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40 24"
      width="24"
      height="24"
      className={`flex flex-col gap-4 ${
        state.theme.theme === "LIGHT" ? "fill-blue-600" : " fill-blue-600"
      }`}
    >
      <rect x="0" y="2" width="40" height="6" />
      <rect x="5" y="12" width="30" height="6" />
      <rect x="10" y="22" width="20" height="6" />
    </svg>
  );
}

export default FilterIcon;

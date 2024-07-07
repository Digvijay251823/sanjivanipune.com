import React from "react";
import { useGlobalState } from "../State";

interface ToggleProps {
  onToggle: () => void;
  isOpen: boolean;
  style?: string;
}

function ToggleController({ onToggle, isOpen, style }: ToggleProps) {
  const { state } = useGlobalState();
  return (
    <div className={`${isOpen ? "" : ""}`} onClick={onToggle}>
      {isOpen ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50px"
          height="50px"
          viewBox="0 0 512 512"
          className=" fill-blue-600"
        >
          <title>ionicons-v5-k</title>
          <path d="M368,112H144C64.6,112,0,176.6,0,256S64.6,400,144,400H368c79.4,0,144-64.6,144-144S447.4,112,368,112Zm0,256A112,112,0,1,1,480,256,112.12,112.12,0,0,1,368,368Z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50px"
          height="50px"
          viewBox="-5 -5 512 512"
          className={`${
            state.theme.theme === "LIGHT" ? "fill-slate-300" : "fill-slate-700"
          } rotate-180`}
        >
          <title>ionicons-v5-k</title>
          <path d="M368,112H144C64.6,112,0,176.6,0,256S64.6,400,144,400H368c79.4,0,144-64.6,144-144S447.4,112,368,112Zm0,256A112,112,0,1,1,480,256,112.12,112.12,0,0,1,368,368Z" />
        </svg>
      )}
    </div>
  );
}

export default ToggleController;

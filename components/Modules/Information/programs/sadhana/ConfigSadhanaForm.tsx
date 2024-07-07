"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useParams, usePathname } from "next/navigation";
import { useGlobalState } from "@/Utils/State";

export function NOR({ label }: { label: string }) {
  const { state } = useGlobalState();
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="font-semibold" htmlFor="NOR">
        {label}
        <i className="text-red-400">*</i>
      </label>
      <input
        type="number"
        id="NOR"
        name="numberOfRounds"
        placeholder="Number Of Rounds "
        className={`rounded-xl px-4 py-2.5 text-lg border transition-all duration-500 ${
          state.theme.theme === "LIGHT"
            ? "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-100 bg-white border-gray-400"
            : "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-950 bg-stone-950 border-stone-800"
        }`}
        required
      />
    </div>
  );
} //Number Of Rounds

// export function EJRB8A({ label }: { label: string }) {
//   const { state } = useGlobalState();
//   return (
//     <div className="flex flex-col gap-1 w-full">
//       <label className="font-semibold" htmlFor="EJRB8A">
//         {label}
//         <i className="text-red-400">*</i>
//       </label>
//       <input
//         type="number"
//         id="EJRB8A"
//         name="earlyJapaRoundsBefore8AM"
//         placeholder="Early Japa rounds before 8 AM "
//         className={`rounded-xl px-4 py-2.5 text-lg border transition-all duration-500 ${
//           state.theme.theme === "LIGHT"
//             ? "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-100 bg-white border-gray-400"
//             : "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-950 bg-stone-950 border-stone-800"
//         }`}
//         required
//       />
//     </div>
//   );
// } //Early Japa rounds before 8 AM

// export function AJRA8A({ label }: { label: string }) {
//   const { state } = useGlobalState();
//   return (
//     <div className="flex flex-col gap-1 w-full">
//       <label className="font-semibold" htmlFor="AJRA8A">
//         {label}
//         <i className="text-red-400">*</i>
//       </label>
//       <input
//         type="number"
//         id="AJRA8A"
//         name="earlyJapaRoundsAfter8AM"
//         placeholder="Early Japa rounds after 8 AM "
//         className={`rounded-xl px-4 py-2.5 text-lg border transition-all duration-500 ${
//           state.theme.theme === "LIGHT"
//             ? "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-100 bg-white border-gray-400"
//             : "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-950 bg-stone-950 border-stone-800"
//         }`}
//         required
//       />
//     </div>
//   );
// } //Early Japa rounds after 8 AM
export function F8RCT({ label }: { label: string }) {
  const { state } = useGlobalState();
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="font-semibold" htmlFor="F8RCT">
        {label}
        <i className="text-red-400">*</i>
      </label>

      <input
        type="time"
        id="F8RCT"
        name="first8RoundsCompletedTime"
        placeholder="First 8 rounds completed time "
        className={`rounded-xl px-4 py-2.5 text-lg border transition-all duration-500 ${
          state.theme.theme === "LIGHT"
            ? "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-100 bg-white border-gray-400"
            : "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-950 bg-stone-950 border-stone-800"
        }`}
        required
      />
    </div>
  );
} //First 8 rounds completed time
export function N8RCT({ label }: { label: string }) {
  const { state } = useGlobalState();
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="font-semibold" htmlFor="N8RCT">
        {label}
        <i className="text-red-400">*</i>
      </label>

      <input
        type="time"
        id="N8RCT"
        name="next8RoundsCompletedTime"
        placeholder="Next 8 rounds completed time"
        className={`rounded-xl px-4 py-2.5 text-lg border transition-all duration-500 ${
          state.theme.theme === "LIGHT"
            ? "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-100 bg-white border-gray-400"
            : "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-950 bg-stone-950 border-stone-800"
        }`}
        required
      />
    </div>
  );
} //Next 8 rounds completed time
export function WUT({ label }: { label: string }) {
  const { state } = useGlobalState();
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="font-semibold" htmlFor="WUT">
        {label}
        <i className="text-red-400">*</i>
      </label>

      <input
        type="time"
        id="WUT"
        name="wakeUpTime"
        placeholder="Wake up time"
        className={`rounded-xl px-4 py-2.5 text-lg border transition-all duration-500 ${
          state.theme.theme === "LIGHT"
            ? "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-100 bg-white border-gray-400"
            : "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-950 bg-stone-950 border-stone-800"
        }`}
        required
      />
    </div>
  );
} //Wake up time
export function ST({ label }: { label: string }) {
  const { state } = useGlobalState();
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="font-semibold" htmlFor="ST">
        {label}
        <i className="text-red-400">*</i>
      </label>

      <input
        type="time"
        id="ST"
        name="sleepTime"
        placeholder="Sleep time"
        className={`rounded-xl px-4 py-2.5 text-lg border transition-all duration-500 ${
          state.theme.theme === "LIGHT"
            ? "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-100 bg-white border-gray-400"
            : "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-950 bg-stone-950 border-stone-800"
        }`}
        required
      />
    </div>
  );
} //Sleep time
export function PBR({ label }: { label: string }) {
  const { state } = useGlobalState();
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="font-semibold" htmlFor="PBR">
        {label}
        <i className="text-gray-500 font-normal">in minutes</i>
        <i className="text-red-400">*</i>
      </label>
      <input
        type="number"
        id="PBR"
        name="prabhupadaBookReading"
        placeholder="Prabhupada Book Reading "
        className={`rounded-xl px-4 py-2.5 text-lg border transition-all duration-500 ${
          state.theme.theme === "LIGHT"
            ? "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-100 bg-white border-gray-400"
            : "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-950 bg-stone-950 border-stone-800"
        }`}
        required
      />
    </div>
  );
} //Prabhupada Book Reading
export function BNR({ label }: { label: string }) {
  const { state } = useGlobalState();
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="font-semibold" htmlFor="BNR">
        {label}
        <i className="text-gray-500 font-normal">in minutes</i>
        <i className="text-red-400">*</i>
      </label>
      <input
        type="number"
        id="BNR"
        name="nonPrabhupadaBookReading"
        placeholder="Non Prabhupada Book Reading name"
        className={`rounded-xl px-4 py-2.5 text-lg border transition-all duration-500 ${
          state.theme.theme === "LIGHT"
            ? "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-100 bg-white border-gray-400"
            : "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-950 bg-stone-950 border-stone-800"
        }`}
        required
      />
    </div>
  );
} //Book Name Reading
export function PCH({ label }: { label: string }) {
  const { state } = useGlobalState();
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="font-semibold" htmlFor="PCH">
        {label}
        <i className="text-gray-500 font-normal">in minutes</i>
        <i className="text-red-400">*</i>
      </label>
      <input
        type="number"
        id="PCH"
        name="prabhupadaClassHearing"
        placeholder="Prabhupada Class Hearing "
        className={`rounded-xl px-4 py-2.5 text-lg border transition-all duration-500 ${
          state.theme.theme === "LIGHT"
            ? "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-100 bg-white border-gray-400"
            : "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-950 bg-stone-950 border-stone-800"
        }`}
        required
      />
    </div>
  );
} //Prabhupada Class Hearing
export function GCH({ label }: { label: string }) {
  const { state } = useGlobalState();
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="font-semibold" htmlFor="GCH">
        {label}
        <i className="text-gray-500 font-normal">in minutes</i>
        <i className="text-red-400">*</i>
      </label>
      <input
        type="number"
        id="GCH"
        name="guruClassHearing"
        placeholder="Guru Class Hearing "
        className={`rounded-xl px-4 py-2.5 text-lg border transition-all duration-500 ${
          state.theme.theme === "LIGHT"
            ? "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-100 bg-white border-gray-400"
            : "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-950 bg-stone-950 border-stone-800"
        }`}
        required
      />
    </div>
  );
} //Guru Class Hearing
export function CH({ label }: { label: string }) {
  const { state } = useGlobalState();
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="font-semibold" htmlFor="CH">
        {label}
        <i className="text-gray-500 font-normal">in minutes</i>
        <i className="text-red-400">*</i>
      </label>
      <input
        type="number"
        id="CH"
        name="otherClassHearing"
        placeholder="Other Class Hearing"
        className={`rounded-xl px-4 py-2.5 text-lg border transition-all duration-500 ${
          state.theme.theme === "LIGHT"
            ? "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-100 bg-white border-gray-400"
            : "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-950 bg-stone-950 border-stone-800"
        }`}
        required
      />
    </div>
  );
} //Class Hearing
export function S({ label }: { label: string }) {
  const { state } = useGlobalState();
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="font-semibold" htmlFor="S">
        {label}
        <i className="text-red-400">*</i>
      </label>
      <input
        type="text"
        id="S"
        name="speaker"
        placeholder="Other Speaker name that you hearing to"
        className={`rounded-xl px-4 py-2.5 text-lg border transition-all duration-500 ${
          state.theme.theme === "LIGHT"
            ? "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-100 bg-white border-gray-400"
            : "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-950 bg-stone-950 border-stone-800"
        }`}
        required
      />
    </div>
  );
} //Speaker
export function AA({
  label,
  onChange,
}: {
  label: string;
  onChange: (object: { target: { name: any; value: any } }) => void;
}) {
  const { state } = useGlobalState();
  const [selectionOpen, setSelectionOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const menuRef = useRef<any>();

  // Attach click outside listener
  useEffect(() => {
    const handleClickOutside: any = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setSelectionOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="font-semibold" htmlFor="AA">
        {label}
        <i className="text-red-400">*</i>
      </label>
      <div className="relative inline-block text-left" ref={menuRef}>
        <button
          type="button"
          className={`rounded-xl px-4 py-2 text-lg border flex items-center justify-between font-semibold w-full transition-all duration-500 ${
            state.theme.theme === "LIGHT"
              ? "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-100 bg-white border-gray-400"
              : "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-950 bg-stone-950 border-stone-800 "
          }`}
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
          onClick={() => setSelectionOpen(!selectionOpen)}
        >
          {selectedItem.length > 0 ? `${selectedItem}` : "Select"}
          <ChevronDownIcon className="h-3 w-3 " />
        </button>
        {selectionOpen && (
          <div
            className={`px-1 py-1.5 rounded-lg mt-1.5 absolute z-[1000] w-full shadow-lg  ${
              state.theme.theme === "LIGHT"
                ? "bg-white"
                : "bg-stone-900 shadow-black"
            }`}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <div className="flex flex-col" role="none">
              <p
                onClick={() => {
                  const e = {
                    target: {
                      name: "attendedArthi",
                      value: "YES",
                    },
                  };
                  onChange(e);
                  setSelectionOpen(false);
                  setSelectedItem("Yes");
                }}
                className={`px-1 py-1.5 hover:bg-gray-200 cursor-pointer rounded-md`}
              >
                Yes{" "}
              </p>
              <p
                onClick={() => {
                  const e = {
                    target: {
                      name: "attendedArthi",
                      value: "NO",
                    },
                  };
                  onChange(e);
                  setSelectionOpen(false);
                  setSelectedItem("No");
                }}
                className={`px-1 py-1.5 hover:bg-gray-200 cursor-pointer rounded-md`}
              >
                No
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} //Attended Arthi
export function MIU({ label }: { label: string }) {
  const { state } = useGlobalState();
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="font-semibold" htmlFor="MIU">
        {label}
        <i className="text-gray-500 font-normal">in minutes</i>
        <i className="text-red-400">*</i>
      </label>
      <input
        type="number"
        name="mobileInternetUsage"
        id="MIU"
        placeholder="handleChange/Internet-Usage"
        className={`rounded-xl px-4 py-2.5 text-lg border transition-all duration-500 ${
          state.theme.theme === "LIGHT"
            ? "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-100 bg-white border-gray-400"
            : "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-950 bg-stone-950 border-stone-800"
        }`}
        required
      />
    </div>
  );
} //Mobile/Internet-Usage
export function T({ label }: { label: string }) {
  const { state } = useGlobalState();
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="font-semibold" htmlFor="T">
        {label}
        <i className="text-red-400">*</i>
      </label>
      <input
        type="text"
        name="topic"
        id="T"
        placeholder="handleChange/Internet-Usage"
        className={`rounded-xl px-4 py-2.5 text-lg border transition-all duration-500 ${
          state.theme.theme === "LIGHT"
            ? "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-100 bg-white border-gray-400"
            : "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-950 bg-stone-950 border-stone-800"
        }`}
        required
      />
    </div>
  );
} //Topic
export function VS({
  label,
  onChange,
}: {
  label: string;
  onChange: (object: { target: { name: any; value: any } }) => void;
}) {
  const { state } = useGlobalState();
  const [selectionOpen, setSelectionOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const menuRef = useRef<any>();

  // Attach click outside listener
  useEffect(() => {
    const handleClickOutside: any = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setSelectionOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="font-semibold" htmlFor="VS">
        {label}
        <i className="text-red-400">*</i>
      </label>
      <div className="relative inline-block text-left" ref={menuRef}>
        <button
          type="button"
          className={`rounded-xl px-4 py-2 text-lg border flex items-center justify-between font-semibold w-full transition-all duration-500 ${
            state.theme.theme === "LIGHT"
              ? "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-100 bg-white border-gray-400"
              : "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-950 bg-stone-950 border-stone-800 "
          }`}
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
          onClick={() => setSelectionOpen(!selectionOpen)}
        >
          {selectedItem.length > 0 ? `${selectedItem}` : "Select"}
          <ChevronDownIcon className="h-3 w-3 " />
        </button>
        {selectionOpen && (
          <div
            className={`px-1 py-1.5 rounded-lg mt-1.5 absolute z-[1000] w-full shadow-lg  ${
              state.theme.theme === "LIGHT"
                ? "bg-white"
                : "bg-stone-900 shadow-black"
            }`}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <div className="flex flex-col" role="none">
              <p
                onClick={() => {
                  const e = {
                    target: {
                      name: "visibleSadhana",
                      value: "YES",
                    },
                  };
                  onChange(e);
                  setSelectionOpen(false);
                  setSelectedItem("Yes");
                }}
                className={`px-1 py-1.5 hover:bg-gray-200 cursor-pointer rounded-md`}
              >
                Yes{" "}
              </p>
              <p
                onClick={() => {
                  const e = {
                    target: {
                      name: "visibleSadhana",
                      value: "NO",
                    },
                  };
                  onChange(e);
                  setSelectionOpen(false);
                  setSelectedItem("No");
                }}
                className={`px-1 py-1.5 hover:bg-gray-200 cursor-pointer rounded-md`}
              >
                No
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} //Visible Sadhana

export const FormListItems = [
  {
    id: 1,
    type: "Attended Arthi",
    valueType: "Boolean",
    functionName: "AA",
    databaseField: "attendedArti",
  },
  {
    id: 2,
    type: "Book Name Reading",
    valueType: "Text",
    functionName: "BNR",
    databaseField: "nonPrabhupadaBookReading",
  },
  // {
  //   id: 2,
  //   type: "Early Japa rounds before 8 AM ",
  //   valueType: "Number",
  //   functionName: "EJRB8A",
  //   databaseField: "earlyJapaRoundsBefore8AM",
  // },
  // {
  //   id: 3,
  //   type: "Early Japa rounds after 8 AM ",
  //   valueType: "Number",
  //   functionName: "AJRA8A",
  //   databaseField: "earlyJapaRoundsAfter8AM",
  // },
  {
    id: 3,
    type: "Class Hearing Time",
    valueType: "Number",
    functionName: "CH",
    databaseField: "otherClassHearing",
  },
  {
    id: 4,
    type: "Guru Maharaj Class Hearing Time",
    valueType: "Number",
    functionName: "GCH",
    databaseField: "guruClassHearing",
  },
  {
    id: 5,
    type: "First 8 rounds completed time ",
    valueType: "Number",
    functionName: "F8RCT",
    databaseField: "first8RoundsCompletedTime",
  },
  {
    id: 6,
    type: "Mobile/Internet-Usage",
    valueType: "Number",
    functionName: "MIU",
    databaseField: "mobileInternetUsage",
  },
  {
    id: 7,
    type: "Number of Rounds ",
    valueType: "Number",
    functionName: "NOR",
    databaseField: "numberOfRounds",
  },
  {
    id: 8,
    type: "Next 8 rounds completed time ",
    valueType: "Number",
    functionName: "N8RCT",
    databaseField: "next8RoundsCompletedTime",
  },
  {
    id: 9,
    type: "Prabhupada Book Reading Time",
    valueType: "Number",
    functionName: "PBR",
    databaseField: "prabhupadaBookReading",
  },

  {
    id: 10,
    type: "Prabhupada Class Hearing Time",
    valueType: "Number",
    functionName: "PCH",
    databaseField: "prabhupadaClassHearing",
  },

  {
    id: 11,
    type: "Sleep time ",
    valueType: "Time",
    functionName: "ST",
    databaseField: "sleepTime",
  },
  {
    id: 12,
    type: "Wake up time ",
    valueType: "Time",
    functionName: "WUT",
    databaseField: "wakeUpTime",
  },
  {
    id: 13,
    type: "Speaker Name",
    valueType: "Text",
    functionName: "S",
    databaseField: "speaker",
  },
  {
    id: 14,
    type: "Topic",
    valueType: "Text",
    functionName: "T",
    databaseField: "topic",
  },
  {
    id: 15,
    type: "Visible Sadhana",
    valueType: "Text",
    functionName: "VS",
    databaseField: "visibleSadhana",
  },
];

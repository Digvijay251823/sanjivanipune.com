import { useGlobalState } from "@/Utils/State";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/16/solid";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDebounce } from "use-debounce";

function Filter({
  category,
}: {
  category:
    | "programName"
    | "levelName"
    | "levelDisplayName"
    | "participantFirstName"
    | "participantLastName"
    | "participantContactNumber";
}) {
  const [isOpen, setIsOpen] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        componentRef.current &&
        !componentRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="ml-2">
      <button onClick={() => setIsOpen(true)}>
        <FunnelIcon className="h-5 w-5" />
      </button>
      <div
        ref={componentRef}
        className={`absolute w-full lg:right-32 right-0 left-0 transition-all duration-500 ${
          isOpen ? "-translate-y-20 " : " -translate-y-96"
        }`}
      >
        <div className="md:w-[400px] lg:ml-64 ">
          <div className="mx-5">
            <ActionFilter category={category} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;

function ActionFilter({
  category,
}: {
  category:
    | "programName"
    | "levelName"
    | "levelDisplayName"
    | "participantFirstName"
    | "participantLastName"
    | "participantContactNumber";
}) {
  const searchParams = useSearchParams();
  const searchUrlParams = Object.fromEntries(new URLSearchParams(searchParams));
  const pathname = usePathname();

  if (category === "programName") {
    return <ProgramNamesSelect />;
  } else if (category === "participantFirstName") {
    return <ParticipantFirstNameInput />;
  } else if (category === "participantLastName") {
    return <ParticipantLastNameInput />;
  } else if (category === "participantContactNumber") {
    return <ParticipantContactNumberInput />;
  } else if (category === "levelDisplayName") {
    return <LevelDisplayName />;
  } else if (category === "levelName") {
    return <LevelName />;
  }
}

function ProgramNamesSelect() {
  const [isSelectionOpen, toggleSelection] = useState(false);
  const [activityArr, setActivityArr] = useState([]);
  const { state } = useGlobalState();
  const menuRef: any = useRef();
  const [selectedOption, setSelectedOption] = useState("");
  const [modalStyle, setModalStyle] = useState({
    transform: "scale(0.95)",
    opacity: 0,
  });
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchUrlParams = Object.fromEntries(new URLSearchParams(searchParams));
  const initialRef = useRef(true);
  const [value] = useDebounce(selectedOption, 500);

  const prevQry: any = {
    ...searchUrlParams,
  };
  const queryStr: any = {
    ...searchUrlParams,
    programName: value,
  };

  const filterQuery = Object.keys(prevQry).filter(
    (item) => item !== "programName"
  );

  const prevQueryString = Object.keys(prevQry)
    .map(
      (key) => encodeURIComponent(key) + "=" + encodeURIComponent(queryStr[key])
    )
    .join("&");
  const queryString = Object.keys(queryStr)
    .map(
      (key) => encodeURIComponent(key) + "=" + encodeURIComponent(queryStr[key])
    )
    .join("&");

  useEffect(() => {
    if (initialRef.current) {
      initialRef.current = false;
      return;
    }
    if (!value) {
      router.push(`${pathname}?${prevQueryString}`);
    } else {
      router.push(`${pathname}?${queryString}`);
    }
  }, [value, router, pathname, queryString, prevQueryString]);

  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`/api/admin/information/programs`);
        if (response.ok) {
          const responseData = await response.json();
          setActivityArr(responseData.content.content);
        } else {
          const errorData = await response.json();
          console.log(errorData);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    if (isSelectionOpen) {
      // Open modal animation
      setTimeout(() => {
        setModalStyle({
          transform: "scale(1)",
          opacity: 1,
        });
      }, 50); // Delay the transition slightly for better visual effect
    } else {
      // Close modal animation
      setModalStyle({
        transform: "scale(0.95)",
        opacity: 0,
      });
      setTimeout(() => {
        setIsClosing(false);
      }, 3000); // Adjust this duration according to your transition duration
    }
  }, [isSelectionOpen]);

  const closeModal = useCallback(() => {
    setIsClosing(true);
    toggleSelection(false);
  }, [toggleSelection]);

  // Attach click outside listener
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeModal();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleSelection, closeModal]);
  return (
    <div className="relative inline-block text-left w-full" ref={menuRef}>
      <button
        type="button"
        className={`flex items-center justify-between border px-2 py-2 rounded-xl gap-5 w-full focus:ring-4 outline-none focus:border font-semibold ${
          state.theme.theme === "LIGHT"
            ? "border-gray-300 bg-white focus:ring-blue-100 focus:border-blue-600"
            : "border-stone-700 bg-stone-950 focus:ring-blue-950 focus:border-blue-600"
        }`}
        id="options-menu"
        aria-haspopup="true"
        aria-expanded="true"
        onClick={() => toggleSelection(!isSelectionOpen)}
      >
        {selectedOption === "" ? "Select" : selectedOption}
        <ChevronDownIcon className="h-4 w-4" />
      </button>
      {isSelectionOpen && (
        <div
          className={`origin-top-left absolute font-semibold text-lg z-[2500] w-full rounded-lg shadow-lg  mt-2 ${
            state.theme.theme === "LIGHT"
              ? "bg-white border-gray-300"
              : "bg-stone-900 border border-stone-700"
          } ring-1 ring-black ring-opacity-5 focus:outline-none py-1 px-1`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
          style={{
            ...modalStyle,
            transition: "transform 0.2s ease-out, opacity 0.2s ease-out",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {activityArr?.length > 0 ? (
            <ul
              className={`flex flex-col gap-3 overflow-y-auto ${
                activityArr.length > 10
                  ? "md:h-[40vh] h-[60vh]"
                  : "h-[40vh] custom-scrollbar"
              }`}
              role="none"
            >
              {activityArr?.map((item: ProgramsData, index: number) => (
                <div
                  key={index}
                  onClick={() => {
                    setSelectedOption(item.name);
                    toggleSelection(false);
                  }}
                  className={`px-2 py-1.5 rounded-lg ${
                    item.name === selectedOption && "bg-blue-300"
                  } ${
                    state.theme.theme === "LIGHT"
                      ? "hover:bg-gray-100 "
                      : "hover:bg-stone-700"
                  }`}
                >
                  {item.name}
                </div>
              ))}
            </ul>
          ) : (
            <ul>
              <p>No data to show</p>
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

function ParticipantContactNumberInput() {
  const { state } = useGlobalState();
  const [onFocusFilterInput, setOnFocusFilterInput] = useState(false);
  const [searchParamsInput, setSearchParamsInput] = useState("");
  const initialRef = useRef(true);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchUrlParams = Object.fromEntries(new URLSearchParams(searchParams));
  const [value] = useDebounce(searchParamsInput, 500);

  const prevQry: any = {
    ...searchUrlParams,
  };
  const queryStr: any = {
    ...searchUrlParams,
    participantContactNumber: value,
  };
  const filterQuery = Object.keys(prevQry).filter(
    (item) => item !== "participantContactNumber"
  );

  const prevQueryString = filterQuery
    .map(
      (key) => encodeURIComponent(key) + "=" + encodeURIComponent(queryStr[key])
    )
    .join("&");
  const queryString = Object.keys(queryStr)
    .map(
      (key) => encodeURIComponent(key) + "=" + encodeURIComponent(queryStr[key])
    )
    .join("&");

  useEffect(() => {
    if (initialRef.current) {
      initialRef.current = false;
      return;
    }
    if (!value) {
      router.push(`${pathname}?${prevQueryString}`);
    } else {
      router.push(`${pathname}?${queryString}`);
    }
  }, [value, router, pathname, queryString, prevQueryString]);

  return (
    <div
      onFocus={() => setOnFocusFilterInput(true)}
      onBlur={() => setOnFocusFilterInput(false)}
      className={`rounded-xl pr-4 py-2 text-lg border transition-all duration-500 w-full flex items-center ${
        state.theme.theme === "LIGHT"
          ? `${
              onFocusFilterInput
                ? "border-blue-600 ring-4 ring-blue-100 "
                : "bg-white border-gray-300"
            }`
          : `${
              onFocusFilterInput
                ? "border-blue-600 ring-4 ring-blue-950 bg-stone-950"
                : "bg-stone-950 border-stone-800"
            }`
      }`}
    >
      <p className="px-2">
        <MagnifyingGlassIcon className="h5 w-5" />
      </p>

      <input
        onChange={(e) => setSearchParamsInput(e.target.value)}
        value={searchParamsInput}
        type={"text"}
        placeholder={`write query for participantcontactNumber`}
        className={`outline-none w-full ${
          state.theme.theme === "LIGHT"
            ? `transition-all duration-500  ${
                onFocusFilterInput
                  ? "placeholder:text-gray-400 bg-white"
                  : "bg-white placeholder:text-blue-500 "
              }`
            : `transition-all duration-500  ${
                onFocusFilterInput
                  ? "placeholder:hidden placeholder:text-gray-400 bg-stone-950"
                  : "placeholder:text-blue-500 bg-stone-950"
              }`
        }`}
      />
    </div>
  );
}
function ParticipantFirstNameInput() {
  const { state } = useGlobalState();
  const [onFocusFilterInput, setOnFocusFilterInput] = useState(false);
  const [searchParamsInput, setSearchParamsInput] = useState("");
  const initialRef = useRef(true);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchUrlParams = Object.fromEntries(new URLSearchParams(searchParams));
  const [value] = useDebounce(searchParamsInput, 500);

  const prevQry: any = {
    ...searchUrlParams,
  };
  const queryStr: any = {
    ...searchUrlParams,
    participantFirstName: value,
  };
  const filterQuery = Object.keys(prevQry).filter(
    (item) => item !== "participantFirstName"
  );

  const prevQueryString = filterQuery
    .map(
      (key) => encodeURIComponent(key) + "=" + encodeURIComponent(queryStr[key])
    )
    .join("&");
  const queryString = Object.keys(queryStr)
    .map(
      (key) => encodeURIComponent(key) + "=" + encodeURIComponent(queryStr[key])
    )
    .join("&");

  useEffect(() => {
    if (initialRef.current) {
      initialRef.current = false;
      return;
    }
    if (!value) {
      router.push(`${pathname}?${prevQueryString}`);
    } else {
      router.push(`${pathname}?${queryString}`);
    }
  }, [value, router, pathname, queryString, prevQueryString]);

  return (
    <div
      onFocus={() => setOnFocusFilterInput(true)}
      onBlur={() => setOnFocusFilterInput(false)}
      className={`rounded-xl pr-4 py-2 text-lg border transition-all duration-500 w-full flex items-center ${
        state.theme.theme === "LIGHT"
          ? `${
              onFocusFilterInput
                ? "border-blue-600 ring-4 ring-blue-100 "
                : "bg-white border-gray-300"
            }`
          : `${
              onFocusFilterInput
                ? "border-blue-600 ring-4 ring-blue-950 bg-stone-950"
                : "bg-stone-950 border-stone-800"
            }`
      }`}
    >
      <p className="px-2">
        <MagnifyingGlassIcon className="h5 w-5" />
      </p>

      <input
        onChange={(e) => setSearchParamsInput(e.target.value)}
        value={searchParamsInput}
        type={"text"}
        placeholder={`write query for participantFirstName`}
        className={`outline-none w-full ${
          state.theme.theme === "LIGHT"
            ? `transition-all duration-500  ${
                onFocusFilterInput
                  ? "placeholder:text-gray-400 bg-white"
                  : "bg-white placeholder:text-blue-500 "
              }`
            : `transition-all duration-500  ${
                onFocusFilterInput
                  ? "placeholder:hidden placeholder:text-gray-400 bg-stone-950"
                  : "placeholder:text-blue-500 bg-stone-950"
              }`
        }`}
      />
    </div>
  );
}
function ParticipantLastNameInput() {
  const { state } = useGlobalState();
  const [onFocusFilterInput, setOnFocusFilterInput] = useState(false);
  const [searchParamsInput, setSearchParamsInput] = useState("");
  const initialRef = useRef(true);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchUrlParams = Object.fromEntries(new URLSearchParams(searchParams));
  const [value] = useDebounce(searchParamsInput, 500);

  const prevQry: any = {
    ...searchUrlParams,
  };
  const queryStr: any = {
    ...searchUrlParams,
    participantLastName: value,
  };
  const filterQuery = Object.keys(prevQry).filter(
    (item) => item !== "participantLastName"
  );

  const prevQueryString = filterQuery
    .map(
      (key) => encodeURIComponent(key) + "=" + encodeURIComponent(queryStr[key])
    )
    .join("&");
  const queryString = Object.keys(queryStr)
    .map(
      (key) => encodeURIComponent(key) + "=" + encodeURIComponent(queryStr[key])
    )
    .join("&");

  useEffect(() => {
    if (initialRef.current) {
      initialRef.current = false;
      return;
    }
    if (!value) {
      router.push(`${pathname}?${prevQueryString}`);
    } else {
      router.push(`${pathname}?${queryString}`);
    }
  }, [value, router, pathname, queryString, prevQueryString]);

  return (
    <div
      onFocus={() => setOnFocusFilterInput(true)}
      onBlur={() => setOnFocusFilterInput(false)}
      className={`rounded-xl pr-4 py-2 text-lg border transition-all duration-500 w-full flex items-center ${
        state.theme.theme === "LIGHT"
          ? `${
              onFocusFilterInput
                ? "border-blue-600 ring-4 ring-blue-100 "
                : "bg-white border-gray-300"
            }`
          : `${
              onFocusFilterInput
                ? "border-blue-600 ring-4 ring-blue-950 bg-stone-950"
                : "bg-stone-950 border-stone-800"
            }`
      }`}
    >
      <p className="px-2">
        <MagnifyingGlassIcon className="h5 w-5" />
      </p>

      <input
        onChange={(e) => setSearchParamsInput(e.target.value)}
        value={searchParamsInput}
        type={"text"}
        placeholder={`write query for participantLastName`}
        className={`outline-none w-full ${
          state.theme.theme === "LIGHT"
            ? `transition-all duration-500  ${
                onFocusFilterInput
                  ? "placeholder:text-gray-400 bg-white"
                  : "bg-white placeholder:text-blue-500 "
              }`
            : `transition-all duration-500  ${
                onFocusFilterInput
                  ? "placeholder:hidden placeholder:text-gray-400 bg-stone-950"
                  : "placeholder:text-blue-500 bg-stone-950"
              }`
        }`}
      />
    </div>
  );
}
function LevelName() {
  const { state } = useGlobalState();
  const [onFocusFilterInput, setOnFocusFilterInput] = useState(false);
  const [searchParamsInput, setSearchParamsInput] = useState("");
  const initialRef = useRef(true);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchUrlParams = Object.fromEntries(new URLSearchParams(searchParams));
  const [value] = useDebounce(searchParamsInput, 500);

  const prevQry: any = {
    ...searchUrlParams,
  };
  const queryStr: any = {
    ...searchUrlParams,
    levelName: value,
  };
  const filterQuery = Object.keys(prevQry).filter(
    (item) => item !== "levelName"
  );

  const prevQueryString = filterQuery
    .map(
      (key) => encodeURIComponent(key) + "=" + encodeURIComponent(queryStr[key])
    )
    .join("&");
  const queryString = Object.keys(queryStr)
    .map(
      (key) => encodeURIComponent(key) + "=" + encodeURIComponent(queryStr[key])
    )
    .join("&");

  useEffect(() => {
    if (initialRef.current) {
      initialRef.current = false;
      return;
    }
    if (!value) {
      router.push(`${pathname}?${prevQueryString}`);
    } else {
      router.push(`${pathname}?${queryString}`);
    }
  }, [value, router, pathname, queryString, prevQueryString]);

  return (
    <div
      onFocus={() => setOnFocusFilterInput(true)}
      onBlur={() => setOnFocusFilterInput(false)}
      className={`rounded-xl pr-4 py-2 text-lg border transition-all duration-500 w-full flex items-center ${
        state.theme.theme === "LIGHT"
          ? `${
              onFocusFilterInput
                ? "border-blue-600 ring-4 ring-blue-100 "
                : "bg-white border-gray-300"
            }`
          : `${
              onFocusFilterInput
                ? "border-blue-600 ring-4 ring-blue-950 bg-stone-950"
                : "bg-stone-950 border-stone-800"
            }`
      }`}
    >
      <p className="px-2">
        <MagnifyingGlassIcon className="h5 w-5" />
      </p>

      <input
        onChange={(e) => setSearchParamsInput(e.target.value)}
        value={searchParamsInput}
        type={"text"}
        placeholder={`write query for levelName`}
        className={`outline-none w-full ${
          state.theme.theme === "LIGHT"
            ? `transition-all duration-500  ${
                onFocusFilterInput
                  ? "placeholder:text-gray-400 bg-white"
                  : "bg-white placeholder:text-blue-500 "
              }`
            : `transition-all duration-500  ${
                onFocusFilterInput
                  ? "placeholder:hidden placeholder:text-gray-400 bg-stone-950"
                  : "placeholder:text-blue-500 bg-stone-950"
              }`
        }`}
      />
    </div>
  );
}
function LevelDisplayName() {
  const { state } = useGlobalState();
  const [onFocusFilterInput, setOnFocusFilterInput] = useState(false);
  const [searchParamsInput, setSearchParamsInput] = useState("");
  const initialRef = useRef(true);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchUrlParams = Object.fromEntries(new URLSearchParams(searchParams));
  const [value] = useDebounce(searchParamsInput, 500);

  const prevQry: any = {
    ...searchUrlParams,
  };
  const queryStr: any = {
    ...searchUrlParams,
    levelDisplayName: value,
  };
  const filterQuery = Object.keys(prevQry).filter(
    (item) => item !== "levelDisplayName"
  );

  const prevQueryString = filterQuery
    .map(
      (key) => encodeURIComponent(key) + "=" + encodeURIComponent(queryStr[key])
    )
    .join("&");
  const queryString = Object.keys(queryStr)
    .map(
      (key) => encodeURIComponent(key) + "=" + encodeURIComponent(queryStr[key])
    )
    .join("&");

  useEffect(() => {
    if (initialRef.current) {
      initialRef.current = false;
      return;
    }
    if (!value) {
      router.push(`${pathname}?${prevQueryString}`);
    } else {
      router.push(`${pathname}?${queryString}`);
    }
  }, [value, router, pathname, queryString, prevQueryString]);

  return (
    <div
      onFocus={() => setOnFocusFilterInput(true)}
      onBlur={() => setOnFocusFilterInput(false)}
      className={`rounded-xl pr-4 py-2 text-lg border transition-all duration-500 w-full flex items-center ${
        state.theme.theme === "LIGHT"
          ? `${
              onFocusFilterInput
                ? "border-blue-600 ring-4 ring-blue-100 "
                : "bg-white border-gray-300"
            }`
          : `${
              onFocusFilterInput
                ? "border-blue-600 ring-4 ring-blue-950 bg-stone-950"
                : "bg-stone-950 border-stone-800"
            }`
      }`}
    >
      <p className="px-2">
        <MagnifyingGlassIcon className="h5 w-5" />
      </p>

      <input
        onChange={(e) => setSearchParamsInput(e.target.value)}
        value={searchParamsInput}
        type={"text"}
        placeholder={`write query for levelDisplayName`}
        className={`outline-none w-full ${
          state.theme.theme === "LIGHT"
            ? `transition-all duration-500  ${
                onFocusFilterInput
                  ? "placeholder:text-gray-400 bg-white"
                  : "bg-white placeholder:text-blue-500 "
              }`
            : `transition-all duration-500  ${
                onFocusFilterInput
                  ? "placeholder:hidden placeholder:text-gray-400 bg-stone-950"
                  : "placeholder:text-blue-500 bg-stone-950"
              }`
        }`}
      />
    </div>
  );
}

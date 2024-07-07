"use client";
import useWindowDimensions from "@/Utils/Hooks/WindowDimentions";
import { useGlobalState } from "@/Utils/State";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ViewController from "./ViewController";
import LoadingSkeleton from "@/Utils/LoadingSkeleton";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import SubmitHandlerButton from "@/Utils/SubmitHandlerButton";
import Modal from "@/Utils/Modal";
import { POST, POSTADMIN } from "@/actions/POSTRequests";
import { SERVER_ENDPOINT } from "@/ConfigFetch";
import DateFormatter from "@/Utils/DateFormatter";

function ScheduledSessionTable({
  levelId,
  levelData,
}: {
  levelId: string | number;
  levelData: LevelsData;
}) {
  const [scheduleSession, setScheduleSession] = useState(false);
  const { state, dispatch } = useGlobalState();
  const [scheduledSessionsArr, setCoursesArr] = useState([]);
  const [columnNamesArr, setColumnNamesArr] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { width } = useWindowDimensions();
  const [customisationObjs, setCustomisationObjs] = useState({
    cellSize: "normal",
  });

  function handleCustomisation(object: any) {
    setCustomisationObjs((prevState) => ({
      ...prevState,
      ...object,
    }));
  }

  const handleAddItemToColumnNameArr = (option: { value: string }) => {
    if (columnNamesArr.includes(option.value)) {
      setColumnNamesArr(
        columnNamesArr.filter((selected) => selected !== option.value)
      );
    } else {
      setColumnNamesArr([...columnNamesArr, option.value]);
    }
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/admin/information/sessions/scheduled/${levelId}`
        );
        if (response.ok) {
          const responseData = await response.json();
          setCoursesArr(responseData.content.content);
        } else {
          const errorData = await response.json();
          dispatch({
            type: "SHOW_TOAST",
            payload: { message: errorData.message, type: "ERROR" },
          });
        }
      } catch (error: any) {
        dispatch({
          type: "SHOW_TOAST",
          payload: { type: "ERROR", message: error.message },
        });
      } finally {
        setIsLoading(false);
      }
    })();
  }, [dispatch, levelId, scheduleSession]);
  return (
    <div className={`h-full`}>
      <h1
        className={`md:py-5 py-3 md:px-10 px-3 font-bold text-3xl border-b ${
          state.theme.theme === "LIGHT"
            ? "border-b-gray-200"
            : "border-b-stone-800"
        }`}
      >
        Scheduled Sessions
      </h1>

      <div className="flex items-center justify-end gap-5">
        <button
          className={`my-3 px-4 py-2 text-lg rounded-xl font-semibold ${
            state.theme.theme === "LIGHT"
              ? "bg-blue-50 text-blue-500"
              : "bg-blue-950 bg-opacity-40 text-blue-300"
          }`}
          onClick={() => setScheduleSession(true)}
        >
          + Session
        </button>
        <div className="my-3">
          <ViewController
            handleCustomisation={handleCustomisation}
            handleHidables={handleAddItemToColumnNameArr}
            columnNames={[]}
            options={columnNamesArr}
          />
        </div>
      </div>
      {isLoading ? (
        <>
          <LoadingSkeleton
            rows={6}
            columns={width < 600 ? 3 : 6}
            theme={state.theme.theme}
          />
        </>
      ) : (
        <div
          className={`w-full mx-auto rounded-3xl ${
            state.theme.theme === "LIGHT" ? "bg-gray-50" : "bg-stone-900"
          } p-4`}
        >
          <div className={`overflow-x-auto`}>
            <table className="w-full">
              <thead>
                <tr
                  className={` ${
                    state.theme.theme === "LIGHT"
                      ? "border-b-2 border-gray-400 "
                      : "border-b-2 border-stone700"
                  }`}
                >
                  <th className=" whitespace-nowrap font-bold px-5 pb-3">
                    SESSION NAME
                  </th>
                  <th className=" whitespace-nowrap font-bold px-5 pb-3">
                    SCHEDULED DATE
                  </th>
                  <th className=" whitespace-nowrap font-bold px-5 pb-3">
                    COURSE NAME
                  </th>
                  <th className=" whitespace-nowrap font-bold px-5 pb-3">
                    SESSION NAME
                  </th>
                </tr>
              </thead>
              <tbody>
                {scheduledSessionsArr.length > 0 ? (
                  scheduledSessionsArr.map((item: ScheduledSessions, index) => (
                    <tr key={index}>
                      <td
                        className={`text-center border-b ${
                          customisationObjs.cellSize === "bigger"
                            ? "py-2"
                            : customisationObjs.cellSize === "biggest"
                            ? "py-3"
                            : "py-1"
                        } ${
                          state.theme.theme === "LIGHT"
                            ? "border-b-gray-200"
                            : "border-b-stone-800"
                        }`}
                      >
                        {item.name}
                      </td>
                      <td
                        className={`text-center border-b ${
                          customisationObjs.cellSize === "bigger"
                            ? "py-2"
                            : customisationObjs.cellSize === "biggest"
                            ? "py-3"
                            : "py-1"
                        } ${
                          state.theme.theme === "LIGHT"
                            ? "border-b-gray-200"
                            : "border-b-stone-800"
                        }`}
                      >
                        <DateFormatter dateString={item.startTime} />
                      </td>
                      <td
                        className={`text-center border-b ${
                          customisationObjs.cellSize === "normal"
                            ? "py-2"
                            : customisationObjs.cellSize === "bigger"
                            ? "py-3"
                            : "py-5"
                        } ${
                          state.theme.theme === "LIGHT"
                            ? "border-b-gray-200"
                            : "border-b-stone-800"
                        }`}
                      >
                        {item.courseName}
                      </td>
                      <td
                        className={`text-center border-b ${
                          customisationObjs.cellSize === "bigger"
                            ? "py-2"
                            : customisationObjs.cellSize === "biggest"
                            ? "py-3"
                            : "py-1"
                        } ${
                          state.theme.theme === "LIGHT"
                            ? "border-b-gray-200"
                            : "border-b-stone-800"
                        }`}
                      >
                        {item.sessionName}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={10} className="text-center py-10">
                      No Data To Show
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <ScheduleSession
        isOpen={scheduleSession}
        onClose={() => setScheduleSession(false)}
        level={levelData}
      />
    </div>
  );
}

export default ScheduledSessionTable;

function ScheduleSession({
  isOpen,
  onClose,
  level,
}: {
  isOpen: boolean;
  onClose: () => void;
  level: LevelsData;
}) {
  const { state, dispatch } = useGlobalState();
  const [session, setSession] = useState<Sessions | any>({});
  const [courseArr, setCoursesArr] = useState([]);
  const [sessionsArr, setSessionsArr] = useState([]);
  const [SelectedCourse, setSelectedCourse] = useState<CourseMasterData | any>(
    {}
  );

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("/api/admin/information/courses");
        if (response.ok) {
          const responseData = await response.json();
          setCoursesArr(responseData.content.content);
        } else {
          const errorData = await response.json();
          dispatch({
            type: "SHOW_TOAST",
            payload: { message: errorData.message, type: "ERROR" },
          });
        }
      } catch (error: any) {
        dispatch({
          type: "SHOW_TOAST",
          payload: { type: "ERROR", message: error.message },
        });
      }
    })();
  }, [dispatch]);
  console.log(SelectedCourse);
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `/api/admin/information/sessions/${SelectedCourse.code}`
        );
        if (response.ok) {
          const responseData = await response.json();
          setSessionsArr(responseData.content.content);
        } else {
          const errorData = await response.json();
          dispatch({
            type: "SHOW_TOAST",
            payload: { message: errorData.message, type: "ERROR" },
          });
        }
      } catch (error: any) {
        dispatch({
          type: "SHOW_TOAST",
          payload: { type: "ERROR", message: error.message },
        });
      }
    })();
  }, [dispatch, SelectedCourse.code]);

  async function handleScheduleSession(e: FormData) {
    const name = e.get("name")?.toString();
    const description = e.get("description")?.toString();
    const startTime = e.get("startTime")?.toString();
    if (!name || !description || !startTime) {
      dispatch({
        type: "SHOW_TOAST",
        payload: { type: "ERROR", message: "Fill All The Fields" },
      });
      return;
    }
    const formData: any = {
      name,
      description,
      startTime:
        startTime !== "" ? new Date(startTime).toISOString() : startTime,
      courseName: SelectedCourse.name,
      levelId: level.id,
      sessionId: session.id,
      programId: level.programId,
    };
    try {
      const response = await POSTADMIN(
        formData,
        `${SERVER_ENDPOINT}/session/schedule`
      );
      dispatch({
        type: "SHOW_TOAST",
        payload: { type: "SUCCESS", message: response.message },
      });
      onClose();
    } catch (error: any) {
      dispatch({
        type: "SHOW_TOAST",
        payload: { type: "ERROR", message: error.message },
      });
    }
  }

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <div
        className={`md:p-5 p-3 rounded-3xl shadow-xl ${
          state.theme.theme === "LIGHT"
            ? "bg-gray-50 shadow-gray-300"
            : "bg-stone-900 shadow-stone-950"
        }`}
      >
        <div
          className={`border-b-2 pb-2 ${
            state.theme.theme === "LIGHT"
              ? "border-b-gray-300"
              : "border-b-stone-700"
          }`}
        >
          <h1 className={`text-2xl font-bold `}>Schedule Session</h1>
          <div className="flex items-center text-lg gap-2 font-bold">
            <p>Course : </p>
            <p>{level.name}</p>
          </div>
        </div>
        <div className="lg:w-[40vw] md:w-[60vw] w-[95vw] max-h-[80vh] overflow-y-auto custom-scrollbar px-1">
          <form action={handleScheduleSession} className="mt-5 w-full">
            <div className="w-full flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <label
                  className="font-semibold text-lg"
                  htmlFor="courseName"
                  id="name"
                >
                  Select Course
                </label>
                <MenuOthersDropDown
                  DataArr={courseArr}
                  setSelected={(value: CourseMasterData | Sessions) =>
                    setSelectedCourse(value)
                  }
                  position="down"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label className="font-semibold text-lg">Select Session</label>
                <MenuOthersDropDown
                  setSelected={(value: CourseMasterData | Sessions) =>
                    setSession(value)
                  }
                  DataArr={sessionsArr}
                  position="down"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold text-lg" htmlFor="Session_name">
                  Session Name
                </label>
                <input
                  type="text"
                  name="name"
                  className={`rounded-xl px-4 py-2 text-lg border transition-all duration-500 ${
                    state.theme.theme === "LIGHT"
                      ? "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-100 bg-white"
                      : "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-950 bg-stone-950 border-stone-800"
                  }`}
                  id="Session_name"
                  placeholder="Discover youself"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  className="font-semibold text-lg"
                  htmlFor="Session_Description"
                >
                  Course Description
                </label>
                <textarea
                  name="description"
                  className={`rounded-xl px-4 py-2 text-lg border transition-all duration-500 ${
                    state.theme.theme === "LIGHT"
                      ? "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-100 bg-white"
                      : "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-950 bg-stone-950 border-stone-800"
                  }`}
                  id="Session_Description"
                  placeholder="something description"
                />
              </div>

              <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                <div className="flex flex-col gap-2">
                  <label
                    className="font-semibold text-lg"
                    htmlFor="Start_Date"
                    id="startTime"
                  >
                    Start Time
                  </label>
                  <input
                    type="datetime-local"
                    name="startTime"
                    className={`rounded-xl px-4 py-2 text-lg border transition-all duration-500 ${
                      state.theme.theme === "LIGHT"
                        ? "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-100 bg-white"
                        : "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-950 bg-stone-950 border-stone-800"
                    }`}
                    id="Start_Date"
                    placeholder="expected Start Date"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between md:gap-5 gap-3 mt-5">
                <button
                  type="button"
                  onClick={onClose}
                  className={`text-red-600 font-semibold text-xl w-full py-2 rounded-xl ${
                    state.theme.theme === "LIGHT"
                      ? "bg-red-50"
                      : "bg-red-900 bg-opacity-20"
                  }`}
                >
                  Cancel
                </button>
                <SubmitHandlerButton />
              </div>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
}

interface PropsMenu<T> {
  setSelected: (state: T) => void;
  DataArr: T[];
  defaultVal?: T;
  position: string;
  volunteerid: any;
}

function MenuIconAndDropDown({
  setSelected,
  DataArr,
  defaultVal,
  position,
  volunteerid,
}: PropsMenu<VolunteerTypes>) {
  const [isSelectionOpen, toggleSelection] = useState(false);
  const { state } = useGlobalState();
  const menuRef: any = useRef();
  const [selectedOption, setSelectedOption] = useState<VolunteerTypes | any>(
    {}
  );
  const [modalStyle, setModalStyle] = useState({
    transform: "scale(0.95)",
    opacity: 0,
  });
  useEffect(() => {
    if (volunteerid) {
      const item = DataArr?.filter(
        (value) => value.id === volunteerid && value
      );
      setSelected(item[0]);
      setSelectedOption(item[0]);
    }
  }, [volunteerid, DataArr, setSelected]);
  const [isClosing, setIsClosing] = useState(false);

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
        {Object.keys(selectedOption).length === 0
          ? "Select"
          : selectedOption.initiatedName
          ? selectedOption.initiatedName
          : `${selectedOption.firstName} ${selectedOption.lastName}`}
        <ChevronDownIcon className="h-4 w-4" />
      </button>
      {isSelectionOpen && (
        <div
          className={`origin-top-left absolute font-semibold text-lg z-[10000] ${
            position === "up" ? "bottom-0 mb-12" : "mt-2 right-0"
          } w-full rounded-lg shadow-lg ${
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
          {DataArr?.length > 0 ? (
            <ul
              className={`flex flex-col gap-3 overflow-y-auto ${
                DataArr.length > 10
                  ? "md:h-[40vh] h-[60vh]"
                  : "h-[40vh] custom-scrollbar"
              }`}
              role="none"
            >
              {DataArr?.map((item: VolunteerTypes, index: number) => (
                <li
                  key={index}
                  onClick={() => {
                    setSelectedOption(item);
                    setSelected(item);
                    toggleSelection(false);
                  }}
                  className={`px-2 py-1.5 rounded-lg ${
                    `${item.firstName} ${item.lastName}` ===
                      `${selectedOption.firstName} ${selectedOption.lastName}` &&
                    "bg-blue-300"
                  } ${
                    state.theme.theme === "LIGHT"
                      ? "hover:bg-gray-100 "
                      : "hover:bg-stone-700"
                  }`}
                >
                  {item.initiatedName
                    ? item.initiatedName
                    : `${item.firstName} ${item.lastName}`}
                </li>
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
function MenuOthersDropDown({
  setSelected,
  DataArr,
  defaultVal,
  position,
}: {
  setSelected: (value: CourseMasterData | Sessions) => void;
  DataArr: CourseMasterData[] | Sessions[];
  defaultVal?: string;
  position?: string;
}) {
  const [isSelectionOpen, toggleSelection] = useState(false);
  const { state } = useGlobalState();
  const menuRef: any = useRef();
  const [selectedOption, setSelectedOption] = useState("");
  const [modalStyle, setModalStyle] = useState({
    transform: "scale(0.95)",
    opacity: 0,
  });
  useEffect(() => {
    if (defaultVal) {
      setSelectedOption(defaultVal);
    }
  }, [defaultVal]);
  const [isClosing, setIsClosing] = useState(false);

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
          className={`origin-top-left absolute font-semibold text-lg z-[10000] ${
            position === "up" ? "bottom-0 mb-12" : "mt-2 right-0"
          } w-full rounded-lg shadow-lg ${
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
          {DataArr?.length > 0 ? (
            <ul
              className={`flex flex-col gap-3 overflow-y-auto ${
                DataArr.length > 10
                  ? "md:h-[40vh] h-[60vh]"
                  : "h-[40vh] custom-scrollbar"
              }`}
              role="none"
            >
              {DataArr?.map(
                (item: CourseMasterData | Sessions, index: number) => (
                  <li
                    key={index}
                    onClick={() => {
                      setSelectedOption(item.name);
                      setSelected(item);
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
                  </li>
                )
              )}
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

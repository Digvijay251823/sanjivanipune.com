"use client";
import { useGlobalState } from "@/Utils/State";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ViewController from "./ViewController";
import VolunteerData from "./VolunteerData";
import SortableIcon from "@/Utils/Icons/SortableIcon";
import ScheduledSessionTable from "./ScheduledSessionsTable";
import { HidableColumns } from "@/Utils/TableUtils/HidableColumns";
import SubmitHandlerButton from "@/Utils/SubmitHandlerButton";
import {
  ChevronDownIcon,
  DocumentCheckIcon,
  DocumentIcon,
  LinkIcon,
  XMarkIcon,
} from "@heroicons/react/16/solid";
import Modal from "@/Utils/Modal";
import { POSTADMIN } from "@/actions/POSTRequests";
import { SERVER_ENDPOINT } from "@/ConfigFetch";
import { LinksActivator } from "@/Utils/LinksActivator";
import CopyClipBoard from "@/Utils/CopyToClipBoard";
import QrCode from "@/Utils/QrCodeComponent";
import Link from "next/link";

const Levels: React.FC<responseDataFetched<LevelToDisplay>> = ({
  response,
}) => {
  const { state } = useGlobalState();
  const [columnNamesArr, setColumnNamesArr] = useState<string[]>([]);
  const [levelCreation, setLevelCreation] = useState(false);
  const [queryArr, setQueryArr] = useState([
    { page: 0 },
    { size: 10 }, // a default page size
    { sort: "id" },
  ]);
  const [expandedRow, setExpandedRow] = useState<number>(-1);
  const [selectedLevel, setSelectedLevel] = useState<LevelToDisplay | any>({});
  const [levelArray, setLevelArray] = useState<LevelToDisplay[]>([]);
  const linksActivator = LinksActivator()?.toString();

  useEffect(() => {
    if (response?.content) {
      setLevelArray(response.content);
    }
  }, [response]);
  const handleAddItemToColumnNameArr = (option: { value: string }) => {
    if (columnNamesArr.includes(option.value)) {
      setColumnNamesArr(
        columnNamesArr.filter((selected) => selected !== option.value)
      );
    } else {
      setColumnNamesArr([...columnNamesArr, option.value]);
    }
  };

  useEffect(() => {}, []);

  //Function to sort
  const SortElements = (sortBy: any) => {
    setQueryArr((prev) => {
      const sortIndex = prev.findIndex((item) => item.hasOwnProperty("sort"));
      if (sortIndex !== -1) {
        const updatedQueryArr = [...prev];
        updatedQueryArr[sortIndex] = {
          ...updatedQueryArr[sortIndex],
          sort: sortBy,
        };
        return updatedQueryArr;
      }
      return prev;
    });
  };

  const [customisationObjs, setCustomisationObjs] = useState({
    cellSize: "normal",
  });

  function handleCustomisation(object: any) {
    setCustomisationObjs((prevState) => ({
      ...prevState,
      ...object,
    }));
  }

  const toggleRow = (index: number) => {
    if (expandedRow === index) {
      setExpandedRow(-1); // Collapse the row if it's already expanded
    } else {
      setExpandedRow(index); // Expand the clicked row
    }
  };
  return (
    <div className={`px-2`}>
      <div className="my-3 flex items-center justify-between">
        <div></div>
        <div className="flex items-center gap-5">
          <button
            className={`my-3 px-4 py-2 text-lg rounded-xl font-semibold ${
              state.theme.theme === "LIGHT"
                ? "bg-blue-50 text-blue-500"
                : "bg-blue-950 bg-opacity-40 text-blue-300"
            }`}
            onClick={() => setLevelCreation(true)}
          >
            + Level
          </button>
          <ViewController
            handleCustomisation={handleCustomisation}
            options={columnNamesArr}
            handleHidables={handleAddItemToColumnNameArr}
            columnNames={[
              { columnName: "COURSE NAME", field: "Course_Name_Level" },
              { columnName: "PROGRAM NAME", field: "Program_Name_Level" },
              { columnName: "COORDINATOR", field: "Coordinator_Level" },
              { columnName: "MENTOR", field: "Mentor_Level" },
              { columnName: "PREACHER1", field: "Preacher1_Level" },
              { columnName: "PREACHER2", field: "Preacher2_Level" },
              { columnName: "displayName", field: "Display_Name" },
              { columnName: "sessionDay", field: "Session_Day" },
              { columnName: "STATUS", field: "Status_Level" },
            ]}
          />
        </div>
      </div>

      <div
        className={`w-full rounded-3xl ${
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
                <HidableColumns
                  isColumnHeader={true}
                  stylesClassNames="font-bold px-5 pb-3"
                  columnNamesArray={columnNamesArr}
                  ColumnToHide="Accepting_New_Participants"
                >
                  <p className="font-bold">ACCEPTING PARTICIPANTS</p>
                </HidableColumns>
                <HidableColumns
                  isColumnHeader={true}
                  stylesClassNames=" whitespace-nowrap font-bold px-5 pb-3"
                  columnNamesArray={columnNamesArr}
                  ColumnToHide="Course_Name_Level"
                >
                  <SortableIcon
                    fieldName={"name"}
                    tableHeading={"COURSE NAME"}
                    isSorted={queryArr.some((obj) => obj.sort === "name")}
                  />
                </HidableColumns>
                <HidableColumns
                  isColumnHeader={true}
                  stylesClassNames=" whitespace-nowrap font-bold px-5 pb-3"
                  columnNamesArray={columnNamesArr}
                  ColumnToHide="Program_Name_Level"
                >
                  <SortableIcon
                    fieldName={"programName"}
                    tableHeading={"PROGRAM NAME"}
                    isSorted={queryArr.some(
                      (obj) => obj.sort === "programName"
                    )}
                  />
                </HidableColumns>
                <HidableColumns
                  isColumnHeader={true}
                  stylesClassNames=" whitespace-nowrap font-bold px-5 pb-3"
                  columnNamesArray={columnNamesArr}
                  ColumnToHide="Coordinator_Level"
                >
                  <SortableIcon
                    fieldName={"coordinator"}
                    tableHeading={"COORDINATOR"}
                    isSorted={queryArr.some(
                      (obj) => obj.sort === "coordinator"
                    )}
                  />
                </HidableColumns>
                <HidableColumns
                  isColumnHeader={true}
                  stylesClassNames=" whitespace-nowrap font-bold px-5 pb-3"
                  columnNamesArray={columnNamesArr}
                  ColumnToHide="Mentor_Level"
                >
                  <SortableIcon
                    fieldName={"mentor"}
                    tableHeading={"MENTOR"}
                    isSorted={queryArr.some((obj) => obj.sort === "mentor")}
                  />
                </HidableColumns>
                <HidableColumns
                  isColumnHeader={true}
                  stylesClassNames=" whitespace-nowrap font-bold px-5 pb-3"
                  columnNamesArray={columnNamesArr}
                  ColumnToHide="Preacher1_Level"
                >
                  <SortableIcon
                    fieldName={"preacher1"}
                    tableHeading={"PREACHER1"}
                    isSorted={queryArr.some((obj) => obj.sort === "preacher1")}
                  />
                </HidableColumns>
                <HidableColumns
                  isColumnHeader={true}
                  stylesClassNames=" whitespace-nowrap font-bold px-5 pb-3"
                  columnNamesArray={columnNamesArr}
                  ColumnToHide="Preacher2_Level"
                >
                  <SortableIcon
                    fieldName={"preacher2"}
                    tableHeading={"PREACHER2"}
                    isSorted={queryArr.some((obj) => obj.sort === "preacher2")}
                  />
                </HidableColumns>
                <HidableColumns
                  isColumnHeader={true}
                  stylesClassNames=" font-bold px-5 pb-3"
                  columnNamesArray={columnNamesArr}
                  ColumnToHide="Display_Name"
                >
                  <p>DISPLAY NAME</p>
                </HidableColumns>
                <HidableColumns
                  isColumnHeader={true}
                  stylesClassNames=" font-bold px-5 pb-3"
                  columnNamesArray={columnNamesArr}
                  ColumnToHide="Session_Day"
                >
                  <p>SESSION DAY</p>
                </HidableColumns>
                <HidableColumns
                  isColumnHeader={true}
                  stylesClassNames=" whitespace-nowrap font-bold px-5 pb-3"
                  columnNamesArray={columnNamesArr}
                  ColumnToHide="Status_Level"
                >
                  <SortableIcon
                    fieldName={"status"}
                    tableHeading={"STATUS"}
                    isSorted={queryArr.some((obj) => obj.sort === "status")}
                  />
                </HidableColumns>
                <HidableColumns
                  ColumnToHide=""
                  isColumnHeader={true}
                  stylesClassNames=" whitespace-nowrap font-bold px-5 pb-3"
                  columnNamesArray={columnNamesArr}
                >
                  ATTENDANCE LINK
                </HidableColumns>
                <HidableColumns
                  ColumnToHide=""
                  isColumnHeader={true}
                  stylesClassNames=" whitespace-nowrap font-bold px-5 pb-3"
                  columnNamesArray={columnNamesArr}
                >
                  ACTIVITIES LINK
                </HidableColumns>
                <HidableColumns
                  ColumnToHide=""
                  isColumnHeader={true}
                  stylesClassNames=" whitespace-nowrap font-bold px-5 pb-3"
                  columnNamesArray={columnNamesArr}
                >
                  RSVP LINK
                </HidableColumns>
                <HidableColumns
                  ColumnToHide=""
                  isColumnHeader={true}
                  stylesClassNames="font-bold px-5 pb-3"
                  columnNamesArray={columnNamesArr}
                >
                  GENERAL REGISTER
                </HidableColumns>
              </tr>
            </thead>
            <tbody>
              {levelArray.length > 0 ? (
                levelArray?.map((item: LevelToDisplay, index) => (
                  <React.Fragment key={index}>
                    <tr
                      onClick={() => {
                        if (item) {
                          toggleRow(index);
                          setSelectedLevel(item);
                        }
                      }}
                    >
                      <HidableColumns
                        ColumnToHide="Accepting_New_Participants"
                        isColumnHeader={false}
                        columnNamesArray={columnNamesArr}
                        stylesClassNames={`text-center ${
                          expandedRow !== index && "border-b"
                        } ${
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
                        {item.acceptingNewParticipants ? "YES" : "NO"}
                      </HidableColumns>
                      <HidableColumns
                        ColumnToHide="Course_Name_Level"
                        isColumnHeader={false}
                        columnNamesArray={columnNamesArr}
                        stylesClassNames={`text-center ${
                          expandedRow !== index && "border-b"
                        } ${
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
                      </HidableColumns>
                      <HidableColumns
                        ColumnToHide="Program_Name_Level"
                        isColumnHeader={false}
                        columnNamesArray={columnNamesArr}
                        stylesClassNames={`text-center ${
                          expandedRow !== index && "border-b"
                        } ${
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
                        {item.programName}
                      </HidableColumns>
                      <HidableColumns
                        ColumnToHide="Coordinator_Level"
                        isColumnHeader={false}
                        columnNamesArray={columnNamesArr}
                        stylesClassNames={`text-center ${
                          expandedRow !== index && "border-b"
                        } ${
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
                        <VolunteerData volunteerid={item.coordinator} />
                      </HidableColumns>
                      <HidableColumns
                        ColumnToHide="Mentor_Level"
                        isColumnHeader={false}
                        columnNamesArray={columnNamesArr}
                        stylesClassNames={`text-center ${
                          expandedRow !== index && "border-b"
                        } ${
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
                        <VolunteerData volunteerid={item.mentor} />
                      </HidableColumns>
                      <HidableColumns
                        ColumnToHide="Preacher1_Level"
                        isColumnHeader={false}
                        columnNamesArray={columnNamesArr}
                        stylesClassNames={`text-center ${
                          expandedRow !== index && "border-b"
                        } ${
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
                        <VolunteerData volunteerid={item.preacher1} />
                      </HidableColumns>
                      <HidableColumns
                        ColumnToHide="Preacher2_Level"
                        isColumnHeader={false}
                        columnNamesArray={columnNamesArr}
                        stylesClassNames={`text-center ${
                          expandedRow !== index && "border-b"
                        } ${
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
                        <VolunteerData volunteerid={item.preacher2} />
                      </HidableColumns>
                      <HidableColumns
                        ColumnToHide="Display_Name"
                        isColumnHeader={false}
                        columnNamesArray={columnNamesArr}
                        stylesClassNames={`text-center ${
                          expandedRow !== index && "border-b"
                        } ${
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
                        {item.displayName ? (
                          item.displayName
                        ) : (
                          <p className="text-gray-400">Not Configured</p>
                        )}
                      </HidableColumns>
                      <HidableColumns
                        ColumnToHide="Session_Day"
                        isColumnHeader={false}
                        columnNamesArray={columnNamesArr}
                        stylesClassNames={`text-center ${
                          expandedRow !== index && "border-b"
                        } ${
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
                        {item.sessionDay ? (
                          item.sessionDay
                        ) : (
                          <p className="text-gray-400">Not Configured</p>
                        )}
                      </HidableColumns>
                      <HidableColumns
                        ColumnToHide="Status_Level"
                        isColumnHeader={false}
                        columnNamesArray={columnNamesArr}
                        stylesClassNames={`text-center ${
                          expandedRow !== index && "border-b"
                        } ${
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
                        {item.status}
                      </HidableColumns>
                      <HidableColumns
                        isColumnHeader={false}
                        stylesClassNames={`text-center ${
                          expandedRow !== index && "border-b"
                        } ${
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
                        {item && (
                          <div className="flex items-center gap-5">
                            <Link
                              href={`${linksActivator}/participants/attendance/${item.id}`}
                              className="text-blue-600 underline flex items-center"
                            >
                              <LinkIcon className="h-5 w-5" />
                              link
                            </Link>
                            <QrCode
                              url={`${linksActivator}/participants/attendance/${item.id}`}
                              Content="something"
                            />
                            <CopyClipBoard
                              url={`${linksActivator}/participants/attendance/${item.id}`}
                              NotCopied={
                                <DocumentCheckIcon className="h-5 w-6 " />
                              }
                              whenCopied={
                                <DocumentIcon className="h-5 w-6 text-green" />
                              }
                            />
                          </div>
                        )}
                      </HidableColumns>
                      <HidableColumns
                        isColumnHeader={false}
                        stylesClassNames={`text-center ${
                          expandedRow !== index && "border-b"
                        } ${
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
                        {item && (
                          <div className="flex items-center gap-5">
                            <Link
                              href={`${linksActivator}/participants/activity/${item.id}`}
                              className="text-blue-600 underline flex items-center"
                            >
                              <LinkIcon className="h-5 w-5" />
                              link
                            </Link>
                            <QrCode
                              url={`${linksActivator}/participants/activity/${item.id}`}
                              Content="something"
                            />
                            <CopyClipBoard
                              url={`${linksActivator}/participants/activity/${item.id}`}
                              NotCopied={
                                <DocumentCheckIcon className="h-5 w-6 " />
                              }
                              whenCopied={
                                <DocumentIcon className="h-5 w-6 text-green" />
                              }
                            />
                          </div>
                        )}
                      </HidableColumns>
                      <HidableColumns
                        isColumnHeader={false}
                        stylesClassNames={`text-center ${
                          expandedRow !== index && "border-b"
                        } ${
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
                        {item && (
                          <div className="flex items-center gap-5">
                            <Link
                              href={`${linksActivator}/participants/rsvp/${item.id}`}
                              className="text-blue-600 underline flex items-center"
                            >
                              <LinkIcon className="h-5 w-5" />
                              link
                            </Link>
                            <QrCode
                              url={`${linksActivator}/participants/rsvp/${item.id}`}
                              Content="something"
                            />
                            <CopyClipBoard
                              url={`${linksActivator}/participants/rsvp/${item.id}`}
                              NotCopied={
                                <DocumentCheckIcon className="h-5 w-6 " />
                              }
                              whenCopied={
                                <DocumentIcon className="h-5 w-6 text-green" />
                              }
                            />
                          </div>
                        )}
                      </HidableColumns>
                      <HidableColumns
                        isColumnHeader={false}
                        stylesClassNames={`text-center ${
                          expandedRow !== index && "border-b"
                        } ${
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
                        {item?.acceptingNewParticipants ? (
                          <div className="flex items-center gap-5 mx-5">
                            <Link
                              href={`${linksActivator}/participants/registeration-new/${item.id}`}
                              className="text-blue-600 underline flex items-center"
                            >
                              <LinkIcon className="h-5 w-5" />
                              link
                            </Link>
                            <QrCode
                              url={`${linksActivator}/participants/registeration-new/${item.id}`}
                              Content="something"
                            />
                            <CopyClipBoard
                              url={`${linksActivator}/participants/registeration-new/${item.id}`}
                              NotCopied={
                                <DocumentCheckIcon className="h-5 w-6 " />
                              }
                              whenCopied={
                                <DocumentIcon className="h-5 w-6 text-green" />
                              }
                            />
                          </div>
                        ) : (
                          <div className="text-gray-400">Not Configured</div>
                        )}
                      </HidableColumns>
                    </tr>
                    {item && expandedRow === index && (
                      <tr>
                        <td className="border-b" colSpan={10}>
                          <Modal
                            isOpen={item && expandedRow === index}
                            onClose={() => toggleRow(index)}
                          >
                            <div
                              className={`p-3 m-2 rounded-3xl w-screen h-screen z-[2500] ${
                                state.theme.theme === "LIGHT"
                                  ? "bg-white"
                                  : "bg-stone-950 "
                              }`}
                            >
                              <button
                                onClick={() => toggleRow(index)}
                                className={`absolute right-0 flex items-center gap-2 px-2 py-1.5 rounded-lg m-5 text-red-500 text-xl ${
                                  state.theme.theme === "LIGHT"
                                    ? "bg-gray-100 "
                                    : "bg-stone-900"
                                }`}
                              >
                                <XMarkIcon className="h-5 w-5" />
                                close
                              </button>
                              {item && (
                                <ScheduledSessionTable
                                  levelId={item?.id}
                                  levelData={selectedLevel}
                                />
                              )}
                            </div>
                          </Modal>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
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
      <AddLevel
        isOpen={levelCreation}
        onClose={() => setLevelCreation(false)}
        courseLevelLength={response.totalElements}
        setLevelArray={(newLevel) => {
          setLevelArray((prev) => [...prev, newLevel]);
        }}
      />
    </div>
  );
};

export default Levels;

function AddLevel({
  isOpen,
  onClose,
  courseLevelLength,
  setLevelArray,
}: {
  isOpen: boolean;
  onClose: () => void;
  courseLevelLength: number;
  setLevelArray: (value: LevelToDisplay) => void;
}) {
  const { state, dispatch } = useGlobalState();
  const [preacher1, setpreacher1] = useState(0);
  const [preacher2, setPreacher2] = useState(0);
  const [mentor, setMentor] = useState(0);
  const [coordinator, setCoordinator] = useState(0);
  const [programArr, setProgramArr] = useState([]);
  const [volunteersArr, setVolunteersArr] = useState([]);
  const [sessionDay, setSessionDay] = useState("");
  const [acceptingNewParticipants, setAcceptingNewParticipants] =
    useState(false);
  const [selectedProgram, setSelectedProgram] = useState<ProgramsData | any>(
    {}
  );
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("/api/admin/information/volunteers");
        if (response.ok) {
          const responseData = await response.json();
          setVolunteersArr(responseData.content.content);
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
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("/api/admin/information/programs");
        if (response.ok) {
          const responseData = await response.json();
          setProgramArr(responseData.content.content);
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

  async function handleCreateProgram(e: FormData) {
    const name = e.get("name")?.toString();
    const description = e.get("description")?.toString();
    const expectedStartDate = e.get("expectedStartDate")?.toString();
    const expectedEndDate = e.get("expectedEndDate")?.toString();
    const displayName = e.get("displayName")?.toString();
    const sessionTime = e.get("sessionTime")?.toString();
    const posterUrl = e.get("posterUrl")?.toString();
    if (!name || !description || !expectedEndDate || !expectedStartDate) {
      dispatch({
        type: "SHOW_TOAST",
        payload: { type: "ERROR", message: "Fill All The Fields" },
      });
      return;
    }

    const formData: any = {
      name,
      description,
      programName: selectedProgram.name,
      expectedStartDate:
        expectedStartDate !== ""
          ? new Date(expectedStartDate).toISOString()
          : expectedStartDate,
      expectedEndDate:
        expectedEndDate !== ""
          ? new Date(expectedEndDate).toISOString()
          : expectedEndDate,
      displayName,
      sessionDay,
      acceptingNewParticipants,
      sessionTime: `${sessionTime}:00.000000`,
      posterUrl,
      preacher1,
      preacher2,
      mentor,
      coordinator,
      programId: selectedProgram.id,
      number: courseLevelLength + 1,
    };
    const headers = new Headers();
    setLevelArray(formData);
    headers.append("Content-Type", "application/json");
    try {
      const response = await fetch(`/api/admin/information/levels`, {
        method: "POST",
        headers,
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const responseData = await response.json();
        dispatch({
          type: "SHOW_TOAST",
          payload: { type: "SUCCESS", message: responseData.message },
        });
      } else {
        const responseData = await response.json();
        dispatch({
          type: "SHOW_TOAST",
          payload: { type: "SUCCESS", message: responseData.message },
        });
      }
    } catch (error: any) {
      dispatch({
        type: "SHOW_TOAST",
        payload: { type: "ERROR", message: error.message },
      });
    } finally {
      onClose();
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
        <h1
          className={`text-2xl font-bold border-b-2 pb-3 ${
            state.theme.theme === "LIGHT"
              ? "border-b-gray-300"
              : "border-b-stone-700"
          }`}
        >
          Create Level
        </h1>
        <div className="lg:w-[40vw] md:w-[60vw] w-[95vw] max-h-[80vh] overflow-y-auto custom-scrollbar px-1">
          <form action={handleCreateProgram} className="mt-5 w-full">
            <div className="w-full flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <label
                  className="font-semibold text-lg"
                  htmlFor="Program_Name"
                  id="name"
                >
                  Select Program
                </label>
                <MenuOthersDropDown
                  DataArr={programArr}
                  setSelected={(value: ProgramsData) =>
                    setSelectedProgram(value)
                  }
                  position="down"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold text-lg" htmlFor="Course_Name">
                  Course Name
                </label>
                <input
                  type="text"
                  name="name"
                  className={`rounded-xl px-4 py-2 text-lg border transition-all duration-500 ${
                    state.theme.theme === "LIGHT"
                      ? "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-100 bg-white"
                      : "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-950 bg-stone-950 border-stone-800"
                  }`}
                  id="Course_Name"
                  placeholder="Discover youself"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  className="font-semibold text-lg"
                  htmlFor="Course_Description"
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
                  id="Course_Description"
                  placeholder="something description"
                />
              </div>
              <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                <div className="flex flex-col gap-3">
                  <label className="font-semibold text-lg">preacher1</label>
                  <MenuIconAndDropDown
                    setSelected={(value: VolunteerTypes) =>
                      setpreacher1(value.id)
                    }
                    DataArr={volunteersArr}
                    position="down"
                    volunteerid={
                      selectedProgram?.preacher &&
                      Number(selectedProgram?.preacher)
                    }
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label className="font-semibold text-lg">Coordinator</label>
                  <MenuIconAndDropDown
                    setSelected={(value: VolunteerTypes) =>
                      setCoordinator(value.id)
                    }
                    DataArr={volunteersArr}
                    position="down"
                    volunteerid={
                      selectedProgram?.coordinator &&
                      Number(selectedProgram?.coordinator)
                    }
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label className="font-semibold text-lg">Preacher2</label>
                  <MenuIconAndDropDown
                    setSelected={(value: VolunteerTypes) =>
                      setPreacher2(value.id)
                    }
                    DataArr={volunteersArr}
                    position="up"
                    volunteerid={0}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label className="font-semibold text-lg">Mentor</label>
                  <MenuIconAndDropDown
                    setSelected={(value: VolunteerTypes) => setMentor(value.id)}
                    DataArr={volunteersArr}
                    position="up"
                    volunteerid={
                      selectedProgram?.mentor && Number(selectedProgram?.mentor)
                    }
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                <div className="flex flex-col gap-2">
                  <label
                    className="font-semibold text-lg"
                    htmlFor="expected_Start_Date"
                    id="expectedStartDate"
                  >
                    expected Start Date
                  </label>
                  <input
                    type="date"
                    name="expectedStartDate"
                    className={`rounded-xl px-4 py-2 text-lg border transition-all duration-500 ${
                      state.theme.theme === "LIGHT"
                        ? "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-100 bg-white"
                        : "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-950 bg-stone-950 border-stone-800"
                    }`}
                    id="expected_Start_Date"
                    placeholder="expected Start Date"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    className="font-semibold text-lg"
                    htmlFor="expected_End_Date"
                    id="expectedEndDate"
                  >
                    expected End Date (24 hours Format)
                  </label>
                  <input
                    type="date"
                    name="expectedEndDate"
                    className={`rounded-xl px-4 py-2 text-lg border transition-all duration-500 ${
                      state.theme.theme === "LIGHT"
                        ? "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-100 bg-white"
                        : "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-950 bg-stone-950 border-stone-800"
                    }`}
                    id="expected_End_Date"
                    placeholder="expected end date"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-5">
                <label className="font-semibold text-lg" id="name">
                  Does this course accepting new participants?
                </label>
                <div className="flex items-center gap-5">
                  <label
                    htmlFor="AcceptingNewParticipants"
                    className="flex items-center gap-2"
                  >
                    <input
                      className="h-5 w-5"
                      type="checkbox"
                      id="AcceptingNewParticipants"
                      onChange={() => setAcceptingNewParticipants(true)}
                      checked={acceptingNewParticipants === true}
                    />
                    YES
                  </label>
                  <label
                    htmlFor="NotAcceptingNewParticipants"
                    className="flex items-center gap-2"
                  >
                    <input
                      className="h-5 w-5"
                      type="checkbox"
                      id="NotAcceptingNewParticipants"
                      onChange={() => setAcceptingNewParticipants(false)}
                      checked={acceptingNewParticipants === false}
                    />
                    NO
                  </label>
                </div>
              </div>
              <div
                className={`grid grid-cols-1 gap-5 p-3 rounded-3xl ${
                  state.theme.theme === "LIGHT" ? "bg-gray-50" : "bg-stone-800"
                }`}
              >
                <p className="text-red-400">
                  This fields are to ensure that this level accepting new
                  participants
                </p>
                <div>
                  <label className="font-semibold text-lg">sessionDay</label>
                  <SessionsDays
                    DataArr={[
                      "MONDAY",
                      "TUESDAY",
                      "WEDNESDAY",
                      "THURSDAY",
                      "FRIDAY",
                      "SATURDAY",
                      "SUNDAY",
                    ]}
                    setSelected={(value: string) => setSessionDay(value)}
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="displayName"
                    className="font-semibold text-lg"
                  >
                    Display name
                  </label>
                  <input
                    type="text"
                    className={`rounded-xl px-4 py-2 text-lg border transition-all duration-500 ${
                      state.theme.theme === "LIGHT"
                        ? "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-100 bg-white"
                        : "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-950 bg-stone-950 border-stone-800"
                    }`}
                    id="displayName"
                    name="displayName"
                    placeholder="Enter the display name"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="sessionTime"
                    className="font-semibold text-lg"
                  >
                    Session Time
                  </label>
                  <input
                    type="time"
                    className={`rounded-xl px-4 py-2 text-lg border transition-all duration-500 ${
                      state.theme.theme === "LIGHT"
                        ? "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-100 bg-white"
                        : "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-950 bg-stone-950 border-stone-800"
                    }`}
                    id="sessionTime"
                    name="sessionTime"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="posterUrl" className="font-semibold text-lg">
                    Post Url For Program Details
                  </label>
                  <input
                    type="text"
                    className={`rounded-xl px-4 py-2 text-lg border transition-all duration-500 ${
                      state.theme.theme === "LIGHT"
                        ? "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-100 bg-white"
                        : "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-950 bg-stone-950 border-stone-800"
                    }`}
                    id="posterUrl"
                    name="posterUrl"
                    placeholder="https://www.iskconpune.com/ram-navami-isk/"
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
  setSelected: (value: ProgramsData) => void;
  DataArr: ProgramsData[];
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
              {DataArr?.map((item: ProgramsData, index: number) => (
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

function SessionsDays({
  setSelected,
  DataArr,

  position,
}: {
  setSelected: (value: string) => void;
  DataArr: string[];
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
                DataArr.length > 6
                  ? "md:h-[40vh] h-[60vh] custom-scrollbar"
                  : "h-[20vh] custom-scrollbar"
              }`}
              role="none"
            >
              {DataArr?.map((item: string, index: number) => (
                <li
                  key={index}
                  onClick={() => {
                    setSelectedOption(item);
                    setSelected(item);
                    toggleSelection(false);
                  }}
                  className={`px-2 py-1.5 rounded-lg ${
                    item === selectedOption && "bg-blue-300"
                  } ${
                    state.theme.theme === "LIGHT"
                      ? "hover:bg-gray-100 "
                      : "hover:bg-stone-700"
                  }`}
                >
                  {item}
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

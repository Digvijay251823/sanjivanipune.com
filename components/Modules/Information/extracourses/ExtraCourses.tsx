"use client";
import useWindowDimensions from "@/Utils/Hooks/WindowDimentions";
import { useGlobalState } from "@/Utils/State";
import React, { useState } from "react";
import ViewController from "./ViewController";
import { HidableColumns } from "@/Utils/TableUtils/HidableColumns";
import CopyClipBoard from "@/Utils/CopyToClipBoard";
import { LinksActivator } from "@/Utils/LinksActivator";
import {
  DocumentCheckIcon,
  DocumentIcon,
  LinkIcon,
} from "@heroicons/react/16/solid";
import QrCode from "@/Utils/QrCodeComponent";
import Link from "next/link";
import SortableIcon from "@/Utils/Icons/SortableIcon";
import Filter from "./Filter";
import { useSearchParams } from "next/navigation";

const ExtraCourses: React.FC<responseDataFetched<extraCoursesTypes>> = ({
  response,
}) => {
  const { state, dispatch } = useGlobalState();
  const [columnNamesArr, setColumnNamesArr] = useState<string[]>([]);
  const [isSpecialNativeQuery, setIsSpecialNativeQuery] = useState(false);
  const { width } = useWindowDimensions();
  const [customisationObjs, setCustomisationObjs] = useState({
    cellSize: "normal",
  });
  const searchParams = useSearchParams();
  function handleCustomisation(object: any) {
    setCustomisationObjs((prevState) => ({
      ...prevState,
      ...object,
    }));
  }
  const urlSearchParams = Object.fromEntries(new URLSearchParams(searchParams));
  const handleAddItemToColumnNameArr = (option: { value: string }) => {
    if (columnNamesArr?.includes(option.value)) {
      setColumnNamesArr(
        columnNamesArr.filter((selected) => selected !== option.value)
      );
    } else {
      setColumnNamesArr([...columnNamesArr, option.value]);
    }
  };
  return (
    <div className="px-2">
      <div className="flex items-center justify-between md:my-5 my-3">
        <div>
          <div className="flex items-center gap-5 mx-5">
            <Link
              href={`${LinksActivator()?.toString()}/participants/registeration-new`}
              className="text-blue-600 underline flex items-center"
            >
              <LinkIcon className="h-5 w-5" />
              link
            </Link>
            <QrCode
              url={`${LinksActivator()?.toString()}/participants/registeration-new`}
              Content="something"
            />
            <CopyClipBoard
              url={`${LinksActivator()?.toString()}/participants/registeration-new`}
              NotCopied={<DocumentCheckIcon className="h-5 w-6 " />}
              whenCopied={<DocumentIcon className="h-5 w-6 text-green" />}
            />
          </div>
        </div>
        <div className="flex items-center gap-5">
          <ViewController
            handleCustomisation={handleCustomisation}
            handleHidables={handleAddItemToColumnNameArr}
            columnNames={[
              { columnName: "PROGRAM NAME", field: "Program_Name" },
              { columnName: "PROGRAM LOCATION", field: "program_Location" },
              { columnName: "LEVEL NAME", field: "level_Name" },
              { columnName: "LEVEL DISPLAY NAME", field: "level_Display_Name" },
              { columnName: "LEVEL STATUS", field: "level_Status" },
              { columnName: "LEVEL SESSION DAY", field: "level_Session_Day" },
              { columnName: "LEVEL SESSION TIME", field: "level_Session_Time" },
              {
                columnName: "PARTICIPANT FIRST NAME",
                field: "Participant_First_Name",
              },
              {
                columnName: "PARTICIPANT LAST NAME",
                field: "Participant_Last_Name",
              },
              {
                columnName: "PARTICIPANT CONTACT NUMBER",
                field: "participant_Contact_Number",
              },
            ]}
            options={columnNamesArr}
          />
        </div>
      </div>
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
                <HidableColumns
                  isColumnHeader={true}
                  stylesClassNames="font-bold px-5 pb-3"
                  columnNamesArray={columnNamesArr}
                  ColumnToHide="Program_Name"
                >
                  <div className="flex items-center">
                    <SortableIcon
                      fieldName={
                        isSpecialNativeQuery ? "program_name" : "programName"
                      }
                      tableHeading={"PROGRAM NAME"}
                      isSorted={
                        urlSearchParams.sort === "program_name" ||
                        urlSearchParams.sort === "programName"
                      }
                    />
                    <Filter category="programName" />
                  </div>
                </HidableColumns>
                <HidableColumns
                  isColumnHeader={true}
                  stylesClassNames="font-bold px-5 pb-3"
                  columnNamesArray={columnNamesArr}
                  ColumnToHide="program_Location"
                >
                  <div>
                    <SortableIcon
                      fieldName={
                        isSpecialNativeQuery
                          ? "program_location"
                          : "programLocation"
                      }
                      tableHeading={"PROGRAM LOCATION"}
                      isSorted={
                        urlSearchParams.sort === "program_location" ||
                        urlSearchParams.sort === "programLocation"
                      }
                    />
                  </div>
                </HidableColumns>
                <HidableColumns
                  isColumnHeader={true}
                  stylesClassNames="font-bold px-5 pb-3"
                  columnNamesArray={columnNamesArr}
                  ColumnToHide="level_Name"
                >
                  <div>
                    <SortableIcon
                      fieldName={
                        isSpecialNativeQuery ? "level_name" : "levelName"
                      }
                      tableHeading={"LEVEL NAME"}
                      isSorted={
                        urlSearchParams.sort === "level_name" ||
                        urlSearchParams.sort === "levelName"
                      }
                    />
                  </div>
                </HidableColumns>
                <HidableColumns
                  isColumnHeader={true}
                  stylesClassNames="font-bold px-5 pb-3"
                  columnNamesArray={columnNamesArr}
                  ColumnToHide="level_Display_Name"
                >
                  <div className="flex items-center">
                    <SortableIcon
                      fieldName={
                        isSpecialNativeQuery
                          ? "level_display_name"
                          : "levelDisplayName"
                      }
                      tableHeading={"LEVEL DISPLAY NAME"}
                      isSorted={
                        urlSearchParams.sort === "level_name" ||
                        urlSearchParams.sort === "levelName"
                      }
                    />
                    <Filter category="levelDisplayName" />
                  </div>
                </HidableColumns>
                <HidableColumns
                  isColumnHeader={true}
                  stylesClassNames="font-bold px-5 pb-3"
                  columnNamesArray={columnNamesArr}
                  ColumnToHide="level_Status"
                >
                  <div>
                    <SortableIcon
                      fieldName={
                        isSpecialNativeQuery ? "level_status" : "levelStatus"
                      }
                      tableHeading={"LEVEL STATUS"}
                      isSorted={
                        urlSearchParams.sort === "level_status" ||
                        urlSearchParams.sort === "levelStatus"
                      }
                    />
                  </div>
                </HidableColumns>
                <HidableColumns
                  isColumnHeader={true}
                  stylesClassNames="font-bold px-5 pb-3"
                  columnNamesArray={columnNamesArr}
                  ColumnToHide="level_Session_Day"
                >
                  <div>
                    <SortableIcon
                      fieldName={
                        isSpecialNativeQuery
                          ? "level_session_day"
                          : "levelSessionDay"
                      }
                      tableHeading={"LEVEL SESSION DAY"}
                      isSorted={
                        urlSearchParams.sort === "level_session_day" ||
                        urlSearchParams.sort === "levelSessionDay"
                      }
                    />
                  </div>
                </HidableColumns>
                <HidableColumns
                  isColumnHeader={true}
                  stylesClassNames="font-bold px-5 pb-3"
                  columnNamesArray={columnNamesArr}
                  ColumnToHide="level_Session_Time"
                >
                  <div>
                    <SortableIcon
                      fieldName={
                        isSpecialNativeQuery
                          ? "level_session_time"
                          : "levelSessionTime"
                      }
                      tableHeading={"LEVEL SESSION TIME"}
                      isSorted={
                        urlSearchParams.sort === "level_session_time" ||
                        urlSearchParams.sort === "levelSessionTime"
                      }
                    />
                  </div>
                </HidableColumns>
                <HidableColumns
                  isColumnHeader={true}
                  stylesClassNames="font-bold px-5 pb-3"
                  columnNamesArray={columnNamesArr}
                  ColumnToHide="Participant_First_Name"
                >
                  <div className="flex items-center">
                    <SortableIcon
                      fieldName={
                        isSpecialNativeQuery
                          ? "participant_first_name"
                          : "participantFirstName"
                      }
                      tableHeading={"PARTICIPANT FIRST NAME"}
                      isSorted={
                        urlSearchParams.sort === "participant_first_name" ||
                        urlSearchParams.sort === "participantFirstName"
                      }
                    />
                    <Filter category="participantFirstName" />
                  </div>
                </HidableColumns>
                <HidableColumns
                  isColumnHeader={true}
                  stylesClassNames="font-bold px-5 pb-3"
                  columnNamesArray={columnNamesArr}
                  ColumnToHide="Participant_Last_Name"
                >
                  <div className="flex items-center">
                    <SortableIcon
                      fieldName={
                        isSpecialNativeQuery
                          ? "participant_last_name"
                          : "participantLastName"
                      }
                      tableHeading={"PARTICIPANT LAST NAME"}
                      isSorted={
                        urlSearchParams.sort === "participant_last_name" ||
                        urlSearchParams.sort === "participantLastName"
                      }
                    />
                    <Filter category="participantLastName" />
                  </div>
                </HidableColumns>
                <HidableColumns
                  isColumnHeader={true}
                  stylesClassNames="font-bold px-5 pb-3"
                  columnNamesArray={columnNamesArr}
                  ColumnToHide="participant_Contact_Number"
                >
                  <div className="flex items-center">
                    <SortableIcon
                      fieldName={
                        isSpecialNativeQuery
                          ? "participant_contact_number"
                          : "participantContactNumber"
                      }
                      tableHeading={"PARTICIPANT CONTACT NUMBER"}
                      isSorted={
                        urlSearchParams.sort === "participant_contact_number" ||
                        urlSearchParams.sort === "participantContactNumber"
                      }
                    />
                    <Filter category="participantContactNumber" />
                  </div>
                </HidableColumns>
              </tr>
            </thead>
            <tbody>
              {response.content.length > 0 ? (
                response.content.map((item: extraCoursesTypes, index) => (
                  <tr key={index}>
                    <HidableColumns
                      ColumnToHide="Program_Name"
                      isColumnHeader={false}
                      columnNamesArray={columnNamesArr}
                      stylesClassNames={`text-center border-b ${
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
                      {item.programName ? (
                        item.programName
                      ) : (
                        <p className="text-gray-500">null</p>
                      )}
                    </HidableColumns>
                    <HidableColumns
                      ColumnToHide="program_Location"
                      isColumnHeader={false}
                      columnNamesArray={columnNamesArr}
                      stylesClassNames={`text-center border-b ${
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
                      {item.programLocation ? (
                        item.programLocation
                      ) : (
                        <p className="text-gray-500">null</p>
                      )}
                    </HidableColumns>
                    <HidableColumns
                      ColumnToHide="level_Name"
                      isColumnHeader={false}
                      columnNamesArray={columnNamesArr}
                      stylesClassNames={`text-center border-b ${
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
                      {item.levelName ? (
                        item.levelName
                      ) : (
                        <p className="text-gray-500">null</p>
                      )}
                    </HidableColumns>
                    <HidableColumns
                      ColumnToHide="level_Display_Name"
                      isColumnHeader={false}
                      columnNamesArray={columnNamesArr}
                      stylesClassNames={`text-center border-b ${
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
                      {item.levelDisplayName ? (
                        item.levelDisplayName
                      ) : (
                        <p className="text-gray-500">null</p>
                      )}
                    </HidableColumns>
                    <HidableColumns
                      ColumnToHide="level_Status"
                      isColumnHeader={false}
                      columnNamesArray={columnNamesArr}
                      stylesClassNames={`text-center border-b ${
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
                      {item.levelStatus ? (
                        item.levelStatus
                      ) : (
                        <p className="text-gray-500">null</p>
                      )}
                    </HidableColumns>
                    <HidableColumns
                      ColumnToHide="level_Session_Day"
                      isColumnHeader={false}
                      columnNamesArray={columnNamesArr}
                      stylesClassNames={`text-center border-b ${
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
                      {item.levelSessionDay ? (
                        item.levelSessionDay
                      ) : (
                        <p className="text-gray-500">null</p>
                      )}
                    </HidableColumns>
                    <HidableColumns
                      ColumnToHide="level_Session_Time"
                      isColumnHeader={false}
                      columnNamesArray={columnNamesArr}
                      stylesClassNames={`text-center border-b ${
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
                      {item.levelSessionTime ? (
                        formatTime(item.levelSessionTime)
                      ) : (
                        <p className="text-gray-500">null</p>
                      )}
                    </HidableColumns>
                    <HidableColumns
                      ColumnToHide="Participant_First_Name"
                      isColumnHeader={false}
                      columnNamesArray={columnNamesArr}
                      stylesClassNames={`text-center border-b ${
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
                      {item.participantFirstName ? (
                        item.participantFirstName
                      ) : (
                        <p className="text-gray-500">null</p>
                      )}
                    </HidableColumns>
                    <HidableColumns
                      ColumnToHide="Participant_Last_Name"
                      isColumnHeader={false}
                      columnNamesArray={columnNamesArr}
                      stylesClassNames={`text-center border-b ${
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
                      {item.participantLastName ? (
                        item.participantLastName
                      ) : (
                        <p className="text-gray-500">null</p>
                      )}
                    </HidableColumns>
                    <HidableColumns
                      ColumnToHide="participant_Contact_Number"
                      isColumnHeader={false}
                      columnNamesArray={columnNamesArr}
                      stylesClassNames={`text-center border-b ${
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
                      {item.participantContactNumber ? (
                        item.participantContactNumber
                      ) : (
                        <p className="text-gray-500">null</p>
                      )}
                    </HidableColumns>
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
    </div>
  );
};

export default ExtraCourses;

function formatTime(timeObject: number[]) {
  // Extract hours, minutes, and seconds from the time object
  let [hour, minute] = timeObject;

  // Determine AM or PM
  var suffix = hour >= 12 ? "PM" : "AM";

  // Convert hours to 12-hour format
  hour = hour % 12 || 12;

  // Add leading zero to minutes and seconds if necessary
  minute = Number(minute < 10 ? "0" + minute : minute);

  // Return formatted time string
  return hour + ":" + minute + suffix;
}

"use client";
import { useGlobalState } from "@/Utils/State";
import React, { useState } from "react";
import ViewController from "./ViewController";
import SortableIcon from "@/Utils/Icons/SortableIcon";
import DateFormatter from "@/Utils/DateFormatter";
import { HidableColumns } from "@/Utils/TableUtils/HidableColumns";
import { usePathname, useSearchParams } from "next/navigation";
import Filter from "./Filter";
import Link from "next/link";
import FilterIcon from "@/Utils/Icons/FilterIcon";

const Activities: React.FC<responseDataFetched<ActivityData>> = ({
  response,
}) => {
  const { state } = useGlobalState();
  const [columnNamesArr, setColumnNamesArr] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const urlSearchParams = Object.fromEntries(new URLSearchParams(searchParams));
  const [isSpecialNativeQuery, setIsSpecialNativeQuery] = useState(false);
  const pathname = usePathname();
  const handleAddItemToColumnNameArr = (option: { value: string }) => {
    if (columnNamesArr.includes(option.value)) {
      setColumnNamesArr(
        columnNamesArr.filter((selected) => selected !== option.value)
      );
    } else {
      setColumnNamesArr([...columnNamesArr, option.value]);
    }
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
  return (
    <div className={`px-2`}>
      <div className="my-3 flex justify-end items-center gap-5">
        <Link href={`${pathname}?sort=id&page=0&size=10`}>
          <button
            className={`flex items-center px-4 py-2 rounded-xl font-semibold text-lg text-blue-600 ${
              state.theme.theme === "LIGHT"
                ? "bg-blue-100"
                : "bg-blue-950 bg-opacity-30"
            }`}
          >
            Clear Filter <FilterIcon />
          </button>
        </Link>
        <ViewController
          handleCustomisation={handleCustomisation}
          handleHidables={handleAddItemToColumnNameArr}
          options={columnNamesArr}
          columnNames={[
            { columnName: "PROGRAM NAME", field: "Program_Name_Activity" },
            { columnName: "LEVEL NAME", field: "Level_Name_Activity" },
            {
              columnName: "SESSION NAME",
              field: "Scheduled_Session_Name_Activity",
            },
            {
              columnName: "ACTIVITY NAME",
              field: "Scheduled_Activity_Name_Activity",
            },
            {
              columnName: "CONTACT NUMBER",
              field: "Participant_Contact_Number_Activity",
            },
            {
              columnName: "FIRST NAME",
              field: "Participant_First_Name_Activity",
            },
            {
              columnName: "LAST NAME",
              field: "Participant_Last_Name_Activity",
            },
            { columnName: "DATE", field: "Participant_Date_Activity" },
          ]}
        />
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
                  columnNamesArray={columnNamesArr}
                  stylesClassNames=" whitespace-nowrap font-bold px-5 pb-3"
                  ColumnToHide="Program_Name_Activity"
                >
                  <div className="flex items-center gap-2">
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
                  columnNamesArray={columnNamesArr}
                  stylesClassNames=" whitespace-nowrap font-bold px-5 pb-3"
                  ColumnToHide="Level_Name_Activity"
                >
                  <div className="flex items-center gap-2">
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
                    <Filter category="levelName" />
                  </div>
                </HidableColumns>
                <HidableColumns
                  isColumnHeader={true}
                  columnNamesArray={columnNamesArr}
                  stylesClassNames=" whitespace-nowrap font-bold px-5 pb-3"
                  ColumnToHide="Scheduled_Session_Name_Activity"
                >
                  <div className="flex items-center gap-2">
                    <SortableIcon
                      fieldName={
                        isSpecialNativeQuery
                          ? "scheduled_session_name"
                          : "scheduledSessionName"
                      }
                      tableHeading={"SESSION NAME"}
                      isSorted={
                        urlSearchParams.sort === "scheduledSessionName" ||
                        urlSearchParams.sort === "scheduled_session_name"
                      }
                    />
                  </div>
                </HidableColumns>
                <HidableColumns
                  isColumnHeader={true}
                  columnNamesArray={columnNamesArr}
                  stylesClassNames=" whitespace-nowrap font-bold px-5 pb-3"
                  ColumnToHide="Scheduled_Activity_Name_Activity"
                >
                  <div className="flex items-center gap-2">
                    <SortableIcon
                      fieldName={
                        isSpecialNativeQuery ? "activity_name" : "activityName"
                      }
                      tableHeading={"ACTIVITY NAME"}
                      isSorted={
                        urlSearchParams.sort === "activity_name" ||
                        urlSearchParams.sort === "activityName"
                      }
                    />

                    <Filter category="activityName" />
                  </div>
                </HidableColumns>
                <HidableColumns
                  isColumnHeader={true}
                  columnNamesArray={columnNamesArr}
                  stylesClassNames=" whitespace-nowrap font-bold px-5 pb-3"
                  ColumnToHide="Participant_Contact_Number_Activity"
                >
                  <div className="flex items-center gap-2">
                    <SortableIcon
                      fieldName={
                        isSpecialNativeQuery
                          ? "participant_contact_number"
                          : "participantContactNumber"
                      }
                      tableHeading={"CONTACT NUMBER"}
                      isSorted={
                        urlSearchParams.sort === "participant_contact_number" ||
                        urlSearchParams.sort === "participantContactNumber"
                      }
                    />
                    <Filter category="participantContactNumber" />
                  </div>
                </HidableColumns>

                <HidableColumns
                  isColumnHeader={true}
                  columnNamesArray={columnNamesArr}
                  stylesClassNames=" whitespace-nowrap font-bold px-5 pb-3"
                  ColumnToHide="Participant_First_Name_Activity"
                >
                  <SortableIcon
                    fieldName={
                      isSpecialNativeQuery
                        ? "participant_first_name"
                        : "participantFirstName"
                    }
                    tableHeading={"FIRST NAME"}
                    isSorted={
                      urlSearchParams.sort === "participant_first_name" ||
                      urlSearchParams.sort === "participantFirstName"
                    }
                  />
                </HidableColumns>
                <HidableColumns
                  isColumnHeader={true}
                  columnNamesArray={columnNamesArr}
                  stylesClassNames=" whitespace-nowrap font-bold px-5 pb-3"
                  ColumnToHide="Participant_Last_Name_Activity"
                >
                  <SortableIcon
                    fieldName={
                      isSpecialNativeQuery
                        ? "participant_last_name"
                        : "participantLastName"
                    }
                    tableHeading={"LAST NAME"}
                    isSorted={
                      urlSearchParams.sort === "participant_last_name" ||
                      urlSearchParams.sort === "participantLastName"
                    }
                  />
                </HidableColumns>
                <HidableColumns
                  isColumnHeader={true}
                  columnNamesArray={columnNamesArr}
                  stylesClassNames=" whitespace-nowrap font-bold px-5 pb-3"
                  ColumnToHide="Participant_Date_Activity"
                >
                  <div className="flex items-center gap-2">
                    <SortableIcon
                      fieldName={
                        isSpecialNativeQuery ? "activity_date" : "activityDate"
                      }
                      tableHeading={"DATE"}
                      isSorted={
                        urlSearchParams.sort === "activityDate" ||
                        urlSearchParams.sort === "activity_date"
                      }
                    />
                    <Filter category="activityDate" />
                  </div>
                </HidableColumns>
              </tr>
            </thead>
            <tbody>
              {response.content.length > 0 ? (
                response.content.map((item: ActivityData, index) => (
                  <tr key={index}>
                    <HidableColumns
                      ColumnToHide="Program_Name_Activity"
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
                      ColumnToHide="Level_Name_Activity"
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
                      ColumnToHide="Scheduled_Session_Name_Activity"
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
                      {item.scheduledSessionName ? (
                        item.scheduledSessionName
                      ) : (
                        <p className="text-gray-500">null</p>
                      )}
                    </HidableColumns>
                    <HidableColumns
                      ColumnToHide="Scheduled_Activity_Name_Activity"
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
                      {item.activityName ? (
                        item.activityName
                      ) : (
                        <p className="text-gray-500">null</p>
                      )}
                    </HidableColumns>
                    <HidableColumns
                      ColumnToHide="Participant_Contact_Number_Activity"
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
                    <HidableColumns
                      ColumnToHide="Participant_First_Name_Activity"
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
                      ColumnToHide="Participant_Last_Name_Activity"
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
                      {item.participantLastName ? (
                        item.participantLastName
                      ) : (
                        <p className="text-gray-500">null</p>
                      )}
                    </HidableColumns>
                    <HidableColumns
                      ColumnToHide="Participant_Date_Activity"
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
                      {item.activityName === "Attendance" ? (
                        item.activityDate
                      ) : (
                        <DateFormatter dateString={item.activityDate} />
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

export default Activities;

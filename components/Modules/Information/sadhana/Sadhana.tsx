"use client";
import useWindowDimensions from "@/Utils/Hooks/WindowDimentions";
import { useGlobalState } from "@/Utils/State";
import React, { useState } from "react";
import ViewController from "./ViewController";
import { HidableColumns } from "@/Utils/TableUtils/HidableColumns";
import SortableIcon from "@/Utils/Icons/SortableIcon";
import Filter from "./Filter";
import { usePathname, useSearchParams } from "next/navigation";

const Sadhana: React.FC<responseDataFetched<SadhanaTypes>> = ({ response }) => {
  const { state, dispatch } = useGlobalState();
  const [columnNamesArr, setColumnNamesArr] = useState<string[]>([]);
  const { width } = useWindowDimensions();
  const [customisationObjs, setCustomisationObjs] = useState({
    cellSize: "normal",
  });
  const searchParams = useSearchParams();
  const urlSearchParams = Object.fromEntries(new URLSearchParams(searchParams));
  const [isSpecialNativeQuery, setIsSpecialNativeQuery] = useState(false);
  const pathname = usePathname();

  function handleCustomisation(object: any) {
    setCustomisationObjs((prevState) => ({
      ...prevState,
      ...object,
    }));
  }
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
        <div></div>
        <div className="flex items-center gap-5">
          <ViewController
            handleCustomisation={handleCustomisation}
            handleHidables={handleAddItemToColumnNameArr}
            columnNames={[
              { columnName: "PROGRAM NAME", field: "Program_Name" },
              { columnName: "SADHANA DATE", field: "Sadhana_Date" },
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
              { columnName: "NUMBER OF ROUND", field: "Number_Of_Round" },
              // {
              //   columnName: "EARLY JAPA BEFORE 8 AM",
              //   field: "Early_Japa_Before_8_AM",
              // },
              // {
              //   columnName: "EARLY JAPA ROUNDS AFTER 8 AM",
              //   field: "early_Japa_Rounds_After_8_AM",
              // },
              {
                columnName: "FIRST 8 ROUND COMPLETED TIME",
                field: "first_8_Round_Completed_Time",
              },
              { columnName: "WAKE UP TIME", field: "wake_up_time" },
              { columnName: "SLEEP TIME", field: "sleep_Time" },
              {
                columnName: "PRABHUPADA BOOK READING",
                field: "Prabhupada_Book_Reading",
              },
              {
                columnName: "NON PRABHUPADA BOOK READING",
                field: "Book_Name_Reading",
              },
              {
                columnName: "PRABHUPADA CLASS HEARING",
                field: "Prabhupada_Class_Hearing",
              },
              { columnName: "GURU CLASS HEARING", field: "Guru_Class_Hearing" },
              { columnName: "SPEAKER NAME(OTHERS)", field: "Speaker_Name" },
              { columnName: "ATTENDED ARTHI", field: "Attended_Arthi" },
              {
                columnName: "MOBILE/INTERNET-USAGE",
                field: "Mobile/Internet-Usage",
              },
              {
                columnName: "TOPIC",
                field: "Topic",
              },
              {
                columnName: "VISIBLE SADHANA",
                field: "Visible_Sadhana",
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
                  stylesClassNames="font-bold px-5 pb-3"
                  columnNamesArray={columnNamesArr}
                  ColumnToHide="Sadhana_Date"
                >
                  <div className="flex items-center gap-2">
                    <SortableIcon
                      fieldName={isSpecialNativeQuery ? "date" : "date"}
                      tableHeading={"SADHANA DATE"}
                      isSorted={
                        urlSearchParams.sort === "date" ||
                        urlSearchParams.sort === "date"
                      }
                    />
                    <Filter category="date" />
                  </div>
                </HidableColumns>
                <HidableColumns
                  isColumnHeader={true}
                  stylesClassNames="font-bold px-5 pb-3"
                  columnNamesArray={columnNamesArr}
                  ColumnToHide="Participant_First_Name"
                >
                  <div className="flex items-center gap-2">
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
                  <div className="flex items-center gap-2">
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
                  <div className="flex items-center gap-2">
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
                <HidableColumns
                  isColumnHeader={true}
                  stylesClassNames="font-bold px-5 pb-3"
                  columnNamesArray={columnNamesArr}
                  ColumnToHide="Number_Of_Round"
                >
                  NUMBER OF ROUND
                </HidableColumns>
                <HidableColumns
                  isColumnHeader={true}
                  stylesClassNames="font-bold px-5 pb-3"
                  columnNamesArray={columnNamesArr}
                  ColumnToHide="first_8_Round_Completed_Time"
                >
                  FIRST 8 ROUND COMPLETED TIME
                </HidableColumns>
                <HidableColumns
                  isColumnHeader={true}
                  stylesClassNames="font-bold px-5 pb-3"
                  columnNamesArray={columnNamesArr}
                  ColumnToHide="wake_up_time"
                >
                  WAKE UP TIME
                </HidableColumns>
                <HidableColumns
                  isColumnHeader={true}
                  stylesClassNames="font-bold px-5 pb-3"
                  columnNamesArray={columnNamesArr}
                  ColumnToHide="sleep_Time"
                >
                  SLEEP TIME
                </HidableColumns>
                <HidableColumns
                  isColumnHeader={true}
                  stylesClassNames="font-bold px-5 pb-3"
                  columnNamesArray={columnNamesArr}
                  ColumnToHide="Prabhupada_Book_Reading"
                >
                  PRABHUPADA BOOK READING
                </HidableColumns>
                <HidableColumns
                  isColumnHeader={true}
                  stylesClassNames="font-bold px-5 pb-3"
                  columnNamesArray={columnNamesArr}
                  ColumnToHide="Book_Name_Reading"
                >
                  NON PRABHUPADA BOOK READING
                </HidableColumns>
                <HidableColumns
                  isColumnHeader={true}
                  stylesClassNames="font-bold px-5 pb-3"
                  columnNamesArray={columnNamesArr}
                  ColumnToHide="Prabhupada_Class_Hearing"
                >
                  PRABHUPADA CLASS HEARING
                </HidableColumns>
                <HidableColumns
                  isColumnHeader={true}
                  stylesClassNames="font-bold px-5 pb-3"
                  columnNamesArray={columnNamesArr}
                  ColumnToHide="Guru_Class_Hearing"
                >
                  GURU CLASS HEARING
                </HidableColumns>
                <HidableColumns
                  isColumnHeader={true}
                  stylesClassNames="font-bold px-5 pb-3"
                  columnNamesArray={columnNamesArr}
                  ColumnToHide="Speaker_Name"
                >
                  SPEAKER NAME(OTHERS)
                </HidableColumns>
                <HidableColumns
                  isColumnHeader={true}
                  stylesClassNames="font-bold px-5 pb-3"
                  columnNamesArray={columnNamesArr}
                  ColumnToHide="Attended_Arthi"
                >
                  ATTENDED ARTHI
                </HidableColumns>
                <HidableColumns
                  isColumnHeader={true}
                  stylesClassNames="font-bold px-5 pb-3"
                  columnNamesArray={columnNamesArr}
                  ColumnToHide="Mobile/Internet-Usage"
                >
                  MOBILE/INTERNET-USAGE
                </HidableColumns>
                <HidableColumns
                  isColumnHeader={true}
                  stylesClassNames="font-bold px-5 pb-3"
                  columnNamesArray={columnNamesArr}
                  ColumnToHide="Topic"
                >
                  TOPIC
                </HidableColumns>
                <HidableColumns
                  isColumnHeader={true}
                  stylesClassNames="font-bold px-5 pb-3"
                  columnNamesArray={columnNamesArr}
                  ColumnToHide="Visible_Sadhana"
                >
                  VISIBLE SADHANA
                </HidableColumns>
              </tr>
            </thead>
            <tbody>
              {response.content.length > 0 ? (
                response.content.map((item: SadhanaTypes, index) => (
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
                      ColumnToHide="Sadhana_Date"
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
                      {item.sadhanaDate ? (
                        item.sadhanaDate
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
                    <HidableColumns
                      ColumnToHide="Number_Of_Round"
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
                      {item.numberOfRounds ? (
                        item.numberOfRounds
                      ) : (
                        <p className="text-gray-500">null</p>
                      )}
                    </HidableColumns>
                    <HidableColumns
                      ColumnToHide="first_8_Round_Completed_Time"
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
                      {item.first8RoundsCompletedTime ? (
                        item.first8RoundsCompletedTime
                      ) : (
                        <p className="text-gray-500">null</p>
                      )}
                    </HidableColumns>
                    <HidableColumns
                      ColumnToHide="wake_up_time"
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
                      {item.wakeUpTime ? (
                        item.wakeUpTime
                      ) : (
                        <p className="text-gray-500">null</p>
                      )}
                    </HidableColumns>
                    <HidableColumns
                      ColumnToHide="sleep_Time"
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
                      {item.sleepTime ? (
                        item.sleepTime
                      ) : (
                        <p className="text-gray-500">null</p>
                      )}
                    </HidableColumns>
                    <HidableColumns
                      ColumnToHide="Prabhupada_Book_Reading"
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
                      {item.prabhupadaBookReading ? (
                        item.prabhupadaBookReading
                      ) : (
                        <p className="text-gray-500">null</p>
                      )}
                    </HidableColumns>
                    <HidableColumns
                      ColumnToHide="Book_Name_Reading"
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
                      {item.nonPrabhupadaBookReading ? (
                        item.nonPrabhupadaBookReading
                      ) : (
                        <p className="text-gray-500">null</p>
                      )}
                    </HidableColumns>
                    <HidableColumns
                      ColumnToHide="Prabhupada_Class_Hearing"
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
                      {item.prabhupadaClassHearing ? (
                        item.prabhupadaClassHearing
                      ) : (
                        <p className="text-gray-500">null</p>
                      )}
                    </HidableColumns>
                    <HidableColumns
                      ColumnToHide="Guru_Class_Hearing"
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
                      {item.guruClassHearing ? (
                        item.guruClassHearing
                      ) : (
                        <p className="text-gray-500">null</p>
                      )}
                    </HidableColumns>
                    <HidableColumns
                      ColumnToHide="Speaker_Name"
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
                      {item.speaker ? (
                        item.speaker
                      ) : (
                        <p className="text-gray-500">null</p>
                      )}
                    </HidableColumns>
                    <HidableColumns
                      ColumnToHide="Attended_Arthi"
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
                      {item.attendedArti ? (
                        item.attendedArti
                      ) : (
                        <p className="text-gray-500">null</p>
                      )}
                    </HidableColumns>
                    <HidableColumns
                      ColumnToHide="Mobile/Internet-Usage"
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
                      {item.mobileInternetUsage ? (
                        item.mobileInternetUsage
                      ) : (
                        <p className="text-gray-500">null</p>
                      )}
                    </HidableColumns>
                    <HidableColumns
                      ColumnToHide="Topic"
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
                      {item.topic ? (
                        item.topic
                      ) : (
                        <p className="text-gray-500">null</p>
                      )}
                    </HidableColumns>
                    <HidableColumns
                      ColumnToHide="Visible_Sadhana"
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
                      {item.visibleSadhana ? (
                        item.visibleSadhana
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

export default Sadhana;

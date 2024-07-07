"use client";
import useWindowDimensions from "@/Utils/Hooks/WindowDimentions";
import { useGlobalState } from "@/Utils/State";
import React, { useEffect, useState } from "react";
import ViewController from "./ViewController";
import LoadingSkeleton from "@/Utils/LoadingSkeleton";
import { HidableColumns } from "@/Utils/TableUtils/HidableColumns";

interface PariticipantData {
  firstName: string;
  lastName: string;
  contactNumber: string;
  dob: string;
  gender: string;
}

const Participants: React.FC<responseDataFetched<PariticipantData>> = ({
  response,
}) => {
  const { state, dispatch } = useGlobalState();

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

  return (
    <div className={`px-2`}>
      <div className="my-3">
        <ViewController
          handleCustomisation={handleCustomisation}
          columnNames={[
            { columnName: "FIRST NAME", field: "First_Name" },
            { columnName: "LAST NAME", field: "Last_Name" },
            { columnName: "PHONE", field: "Phone" },
            { columnName: "DOB", field: "DOB" },
            { columnName: "GENDER", field: "GENDER" },
          ]}
          handleHidables={handleAddItemToColumnNameArr}
          options={columnNamesArr}
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
                  stylesClassNames=" whitespace-nowrap font-bold px-5 pb-3"
                  ColumnToHide="First_Name"
                  columnNamesArray={columnNamesArr}
                >
                  FIRST NAME
                </HidableColumns>
                <HidableColumns
                  isColumnHeader={true}
                  stylesClassNames=" whitespace-nowrap font-bold px-5 pb-3"
                  ColumnToHide="Last_Name"
                  columnNamesArray={columnNamesArr}
                >
                  LAST NAME
                </HidableColumns>
                <HidableColumns
                  isColumnHeader={true}
                  stylesClassNames=" whitespace-nowrap font-bold px-5 pb-3"
                  ColumnToHide="Phone"
                  columnNamesArray={columnNamesArr}
                >
                  PHONE
                </HidableColumns>
                <HidableColumns
                  isColumnHeader={true}
                  stylesClassNames=" whitespace-nowrap font-bold px-5 pb-3"
                  ColumnToHide="DOB"
                  columnNamesArray={columnNamesArr}
                >
                  DOB
                </HidableColumns>
                <HidableColumns
                  isColumnHeader={true}
                  stylesClassNames=" whitespace-nowrap font-bold px-5 pb-3"
                  ColumnToHide="GENDER"
                  columnNamesArray={columnNamesArr}
                >
                  GENDER
                </HidableColumns>
              </tr>
            </thead>
            <tbody>
              {response.content.length > 0 ? (
                response.content.map((item: PariticipantData, index) => (
                  <tr key={index}>
                    <HidableColumns
                      ColumnToHide="First_Name"
                      isColumnHeader={false}
                      stylesClassNames={`whitespace-nowrap text-center border-b ${
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
                      {item.firstName}
                    </HidableColumns>
                    <HidableColumns
                      ColumnToHide="Last_Name"
                      isColumnHeader={false}
                      stylesClassNames={`whitespace-nowrap text-center border-b ${
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
                      {item.lastName}
                    </HidableColumns>
                    <HidableColumns
                      ColumnToHide="Phone"
                      isColumnHeader={false}
                      stylesClassNames={`whitespace-nowrap text-center border-b ${
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
                      {item.contactNumber}
                    </HidableColumns>
                    <HidableColumns
                      ColumnToHide="DOB"
                      isColumnHeader={false}
                      stylesClassNames={`whitespace-nowrap text-center border-b ${
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
                      {item.dob}
                    </HidableColumns>
                    <HidableColumns
                      ColumnToHide="GENDER"
                      isColumnHeader={false}
                      stylesClassNames={`whitespace-nowrap text-center border-b ${
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
                      {item.gender}
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

export default Participants;

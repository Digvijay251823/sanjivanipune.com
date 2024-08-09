"use client";
import useWindowDimensions from "@/Utils/Hooks/WindowDimentions";
import { useGlobalState } from "@/Utils/State";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ViewController from "./ViewController";
import VolunteerData from "./VolunteerData";
import Modal from "@/Utils/Modal";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { HidableColumns } from "@/Utils/TableUtils/HidableColumns";
import SubmitHandlerButton from "@/Utils/SubmitHandlerButton";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LinksActivator } from "@/Utils/LinksActivator";
import QrCode from "@/Utils/QrCodeComponent";
import {
  DocumentCheckIcon,
  DocumentIcon,
  LinkIcon,
  QrCodeIcon,
} from "@heroicons/react/16/solid";
import CopyClipBoard from "@/Utils/CopyToClipBoard";
import AddProgram from "./AddPrograms";

const Programs: React.FC<responseDataFetched<ProgramsData>> = ({
  response,
}) => {
  const { state } = useGlobalState();
  const router = useRouter();
  const [columnNamesArr, setColumnNamesArr] = useState<string[]>([]);
  const [programCreation, setProgramCreation] = useState(false);
  const [customisationObjs, setCustomisationObjs] = useState({
    cellSize: "normal",
  });
  const [programArray, setProgramArray] = useState<ProgramsData[]>();
  const linksActivator = LinksActivator();

  useEffect(() => {
    if (response?.content?.length > 0) {
      setProgramArray(response.content);
    }
  }, [response]);

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
    <div className="px-2">
      <div className="my-3 flex items-center justify-between">
        <div></div>
        <div className="flex items-center gap-5">
          <button
            className={`my-3 px-4 py-2 text-lg rounded-xl font-semibold ${
              state.theme.theme === "LIGHT"
                ? "bg-blue-50 text-blue-500"
                : "bg-blue-950 bg-opacity-40 text-blue-300"
            }`}
            onClick={() => setProgramCreation(true)}
          >
            + Program
          </button>
          <ViewController
            handleCustomisation={handleCustomisation}
            handleHidables={handleAddItemToColumnNameArr}
            columnNames={[
              { columnName: "PROGRAM NAME", field: "Program_Name" },
              { columnName: "PREACHER", field: "Program_Preacher" },
              { columnName: "COORDINATOR", field: "Program_Coordinator" },
              { columnName: "MENTOR", field: "Program_Mentor" },
              { columnName: "INCHARGE", field: "Program_Incharge" },
              { columnName: "TYPE", field: "Program_Type" },
              { columnName: "AUDIENCE TYPE", field: "Program_AudienceType" },
              { columnName: "LOCATION", field: "Program_Location" },
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
                  ColumnToHide="Program_Name"
                  isColumnHeader={true}
                  stylesClassNames=" whitespace-nowrap font-bold px-5 pb-3"
                  columnNamesArray={columnNamesArr}
                >
                  PROGRAM NAME
                </HidableColumns>
                <HidableColumns
                  isColumnHeader={true}
                  stylesClassNames=" whitespace-nowrap font-bold px-5 pb-3"
                  columnNamesArray={columnNamesArr}
                  ColumnToHide="Program_Preacher"
                >
                  PREACHER
                </HidableColumns>
                <HidableColumns
                  isColumnHeader={true}
                  stylesClassNames=" whitespace-nowrap font-bold px-5 pb-3"
                  columnNamesArray={columnNamesArr}
                  ColumnToHide="Program_Coordinator"
                >
                  COORDINATOR
                </HidableColumns>
                <HidableColumns
                  isColumnHeader={true}
                  stylesClassNames=" whitespace-nowrap font-bold px-5 pb-3"
                  columnNamesArray={columnNamesArr}
                  ColumnToHide="Program_Mentor"
                >
                  MENTOR
                </HidableColumns>
                <HidableColumns
                  isColumnHeader={true}
                  stylesClassNames=" whitespace-nowrap font-bold px-5 pb-3"
                  columnNamesArray={columnNamesArr}
                  ColumnToHide="Program_Incharge"
                >
                  INCHARGE
                </HidableColumns>
                <HidableColumns
                  isColumnHeader={true}
                  stylesClassNames=" whitespace-nowrap font-bold px-5 pb-3"
                  columnNamesArray={columnNamesArr}
                  ColumnToHide="Program_Type"
                >
                  TYPE
                </HidableColumns>
                <HidableColumns
                  isColumnHeader={true}
                  stylesClassNames=" whitespace-nowrap font-bold px-5 pb-3"
                  columnNamesArray={columnNamesArr}
                  ColumnToHide="Program_AudienceType"
                >
                  AUDIENCE TYPE
                </HidableColumns>
                <HidableColumns
                  isColumnHeader={true}
                  stylesClassNames=" whitespace-nowrap font-bold px-5 pb-3"
                  columnNamesArray={columnNamesArr}
                  ColumnToHide="Program_Location"
                >
                  LOCATION
                </HidableColumns>
                <HidableColumns
                  isColumnHeader={true}
                  stylesClassNames=" whitespace-nowrap font-bold px-5 pb-3"
                  columnNamesArray={columnNamesArr}
                >
                  ACTIVITIES LINK
                </HidableColumns>
                <HidableColumns
                  isColumnHeader={true}
                  stylesClassNames=" whitespace-nowrap font-bold px-5 pb-3"
                  columnNamesArray={columnNamesArr}
                >
                  SADHANA LINK
                </HidableColumns>
              </tr>
            </thead>
            <tbody>
              {programArray?.map((item: ProgramsData, index) => (
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
                    {item.name}
                  </HidableColumns>
                  <HidableColumns
                    ColumnToHide="Program_Preacher"
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
                    <VolunteerData volunteerid={item.preacher} />
                  </HidableColumns>
                  <HidableColumns
                    ColumnToHide="Program_Coordinator"
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
                    <VolunteerData volunteerid={item.coordinator} />
                  </HidableColumns>
                  <HidableColumns
                    ColumnToHide="Program_Mentor"
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
                    <VolunteerData volunteerid={item.mentor} />
                  </HidableColumns>
                  <HidableColumns
                    ColumnToHide="Program_Incharge"
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
                    <VolunteerData volunteerid={item.incharge} />
                  </HidableColumns>
                  <HidableColumns
                    ColumnToHide="Program_Type"
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
                    {item.type}
                  </HidableColumns>
                  <HidableColumns
                    ColumnToHide="Program_AudienceType"
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
                    {item.audienceType}
                  </HidableColumns>
                  <HidableColumns
                    ColumnToHide="Program_Location"
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
                    {item.location}
                  </HidableColumns>
                  {item && (
                    <HidableColumns
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
                      <div className="flex items-center gap-5">
                        <Link
                          href={`${linksActivator?.toString()}/participants/activity/${
                            item.id
                          }`}
                          className="text-blue-600 underline flex items-center"
                        >
                          <LinkIcon className="h-5 w-5" />
                          link
                        </Link>
                        <QrCode
                          url={`${linksActivator?.toString()}/participants/activity/${
                            item.id
                          }`}
                          Content="something"
                        />
                        <CopyClipBoard
                          url={`${linksActivator?.toString()}/participants/activity/${
                            item.id
                          }`}
                          NotCopied={<DocumentCheckIcon className="h-5 w-6 " />}
                          whenCopied={
                            <DocumentIcon className="h-5 w-6 text-green" />
                          }
                        />
                      </div>
                    </HidableColumns>
                  )}
                  {item && (
                    <HidableColumns
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
                      <div className="flex items-center gap-3">
                        {item.sadhanaForm && item.sadhanaForm > 0 ? (
                          <div className="flex items-center gap-5">
                            <Link
                              href={`${linksActivator?.toString()}/participants/sadhana/${
                                item.id
                              }`}
                              className="text-blue-600 underline flex items-center"
                            >
                              <LinkIcon className="h-5 w-5" />
                              link
                            </Link>
                            <QrCode
                              url={`${linksActivator?.toString()}/participants/sadhana/${
                                item.id
                              }`}
                              Content="something"
                            />
                            <CopyClipBoard
                              url={`${linksActivator?.toString()}/participants/sadhana/${
                                item.id
                              }`}
                              NotCopied={
                                <DocumentCheckIcon className="h-5 w-6 " />
                              }
                              whenCopied={<DocumentIcon className="h-5 w-6 " />}
                            />
                          </div>
                        ) : (
                          <div className="flex items-center gap-5 opacity-25">
                            <p className="text-blue-600 underline flex items-center">
                              <LinkIcon className="h-5 w-5" />
                              link
                            </p>
                            <p>
                              <QrCodeIcon className="h-5 w-5 text-blue-700" />
                            </p>
                            <p>
                              <DocumentIcon className="h-5 w-6 text-blue-700" />
                            </p>
                          </div>
                        )}
                        <Link
                          href={`/admin/information/programs/sadhana/${item.id}`}
                        >
                          <button
                            className={`px-2 py-1.5 ${
                              state.theme.theme === "LIGHT"
                                ? "bg-blue-50 text-blue-600"
                                : "bg-blue-950 text-blue-300"
                            }`}
                          >
                            Configure
                          </button>
                        </Link>
                      </div>
                    </HidableColumns>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <AddProgram
        isOpen={programCreation}
        onClose={() => {
          setProgramCreation(false);
          router.refresh();
        }}
        setProgramArray={(newItem: ProgramsData) => {
          if (programArray && programArray?.length > 0) {
            setProgramArray((prevItems?: ProgramsData[] | any) => [
              ...prevItems,
              newItem,
            ]);
          } else {
            setProgramArray([newItem]);
          }
        }}
      />
    </div>
  );
};

export default Programs;

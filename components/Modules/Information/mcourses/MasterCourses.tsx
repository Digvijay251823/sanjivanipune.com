"use client";
import { useGlobalState } from "@/Utils/State";
import React, { ChangeEvent, useEffect, useState } from "react";
import ViewController from "./ViewController";
import SessionData from "./SessionData";
import { HidableColumns } from "@/Utils/TableUtils/HidableColumns";
import Modal from "@/Utils/Modal";
import SubmitHandlerButton from "@/Utils/SubmitHandlerButton";
import { DocumentIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { POSTADMINCOURSES } from "@/actions/POSTRequests";
import Papa from "papaparse";
import DownloadCSVFile from "@/components/Modules/Information/mcourses/DownloadEmptyCSV";
import { SERVER_ENDPOINT } from "@/ConfigFetch";

interface formDataUpload {
  code: string;
  name: string;
  description: string;
  sessionName: string;
  sessionDescription: string;
  sessionCode: string;
  durationInMinutes: string;
}

const CoursesMaster: React.FC<responseDataFetched<Sessions>> = ({
  response,
}) => {
  const { state } = useGlobalState();
  const [columnNamesArr, setColumnNamesArr] = useState<string[]>([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
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
      <div className="flex items-center justify-end gap-5">
        <DownloadCSVFile />
        <button
          className={`my-3 px-4 py-2 text-lg rounded-xl font-semibold ${
            state.theme.theme === "LIGHT"
              ? "bg-blue-50 text-blue-500"
              : "bg-blue-950 bg-opacity-40 text-blue-300"
          }`}
          onClick={() => setIsOpenModal(true)}
        >
          + Course
        </button>
        <div className="my-3">
          <ViewController
            handleCustomisation={handleCustomisation}
            columnNames={[
              { columnName: "COURSE NAME", field: "Course_Name_Master" },
              {
                columnName: "COURSE DESCRIPTION",
                field: "Course_Description_Master",
              },
              { columnName: "COURSE CODE", field: "Course_Code_Master" },
              {
                columnName: "SESSION CODE",
                field: "Course_Session_Code_Master",
              },
              {
                columnName: "SESSION NAME",
                field: "Course_Session_Name_Master",
              },
              {
                columnName: "SESSION DESCRIPTION",
                field: "Course_Session_Description_Master",
              },
              {
                columnName: "SESSION DURATION",
                field: "Course_Session_Duration_Master",
              },
            ]}
            handleHidables={handleAddItemToColumnNameArr}
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
                  stylesClassNames=" whitespace-nowrap font-bold px-5 pb-3"
                  columnNamesArray={columnNamesArr}
                  ColumnToHide="Course_Name_Master"
                >
                  COURSE NAME
                </HidableColumns>

                <HidableColumns
                  isColumnHeader={true}
                  stylesClassNames=" whitespace-nowrap font-bold px-5 pb-3"
                  columnNamesArray={columnNamesArr}
                  ColumnToHide="Course_Description_Master"
                >
                  COURSE DESCRIPTION
                </HidableColumns>
                <HidableColumns
                  isColumnHeader={true}
                  stylesClassNames=" whitespace-nowrap font-bold px-5 pb-3"
                  columnNamesArray={columnNamesArr}
                  ColumnToHide="Course_Code_Master"
                >
                  COURSE CODE
                </HidableColumns>
                <HidableColumns
                  isColumnHeader={true}
                  stylesClassNames=" whitespace-nowrap font-bold px-5 pb-3"
                  columnNamesArray={columnNamesArr}
                  ColumnToHide="Course_Session_Code_Master"
                >
                  SESSION CODE
                </HidableColumns>
                <HidableColumns
                  isColumnHeader={true}
                  stylesClassNames=" whitespace-nowrap font-bold px-5 pb-3"
                  columnNamesArray={columnNamesArr}
                  ColumnToHide="Course_Session_Name_Master"
                >
                  SESSION NAME
                </HidableColumns>
                <HidableColumns
                  isColumnHeader={true}
                  stylesClassNames=" whitespace-nowrap font-bold px-5 pb-3"
                  columnNamesArray={columnNamesArr}
                  ColumnToHide="Course_Session_Description_Master"
                >
                  SESSION DESCRIPTION
                </HidableColumns>
                <HidableColumns
                  isColumnHeader={true}
                  stylesClassNames=" whitespace-nowrap font-bold px-5 pb-3"
                  columnNamesArray={columnNamesArr}
                  ColumnToHide="Course_Session_Duration_Master"
                >
                  SESSION DURATION
                </HidableColumns>
              </tr>
            </thead>
            <tbody>
              {response.content.length > 0 ? (
                response.content.map((item: Sessions, index) => (
                  <tr key={index}>
                    <HidableColumns
                      ColumnToHide="Course_Name_Master"
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
                      <SessionData
                        coursecode={item.courseCode}
                        fieldName="name"
                      />
                    </HidableColumns>
                    <HidableColumns
                      ColumnToHide="Course_Description_Master"
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
                      <SessionData
                        coursecode={item.courseCode}
                        fieldName="description"
                      />
                    </HidableColumns>
                    <HidableColumns
                      ColumnToHide="Course_Code_Master"
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
                      <SessionData
                        coursecode={item.courseCode}
                        fieldName="code"
                      />
                    </HidableColumns>
                    <HidableColumns
                      ColumnToHide="Course_Session_Code_Master"
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
                      {item.code}
                    </HidableColumns>
                    <HidableColumns
                      ColumnToHide="Course_Session_Name_Master"
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
                      ColumnToHide="Course_Session_Description_Master"
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
                      {item.description}
                    </HidableColumns>
                    <HidableColumns
                      ColumnToHide="Course_Session_Duration_Master"
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
                      {item.durationInMinutes}
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
      <CreateCourse
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
      />
    </div>
  );
};

export default CoursesMaster;

function CreateCourse({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { state, dispatch } = useGlobalState();
  const [isUploadable, setIsUploadable] = useState(true);
  const [file, setFile] = useState<any>(null);
  const [isDragging, setIsDragging] = useState(false);

  //uploadables
  const handleDragEnter: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDragOver: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      const fileType = droppedFile.type;
      if (fileType === "text/csv") {
        // CSV file accepted, set the file state
        setFile(droppedFile);
      } else {
        // Reject non-CSV files
        dispatch({
          type: "SHOW_TOAST",
          payload: {
            type: "ERROR",
            message: "Invalid file type. Please drop a CSV file.",
          },
        });
      }
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile: any = e?.target?.files ? e?.target?.files[0] : null;
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const formatBytes = (bytes: number | string): string => {
    // Convert bytes to a number if it's a string
    if (typeof bytes === "string") {
      bytes = parseFloat(bytes);
    }

    if (bytes === 0) return "0 Bytes";
    const k: number = 1024;
    const sizes: string[] = [
      "Bytes",
      "KB",
      "MB",
      "GB",
      "TB",
      "PB",
      "EB",
      "ZB",
      "YB",
    ];

    const i: number = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleRemoveFile = () => {
    setFile(null);
  };

  //uploading
  const handleFileUpload = () => {
    const errorArr: string[] = [];
    const success = [];
    Papa.parse(file, {
      worker: true,
      download: true,
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      step: async function (row: { data: formDataUpload }, index) {
        // Accessing Code, Description, SessionName, and SessionDescription from each row
        console.log(row.data);
        const header = new Headers();
        header.append("Content-Type", "application/json");
        const {
          code,
          name,
          description,
          sessionName,
          sessionDescription,
          sessionCode,
          durationInMinutes,
        } = row.data;
        try {
          if (
            code ||
            name ||
            description ||
            sessionCode ||
            sessionDescription ||
            sessionName ||
            durationInMinutes
          ) {
            const formData = {
              code,
              name,
              description: description ? description : name,
              sessionCode,
              sessionDescription,
              sessionName,
              durationInMinutes,
            };
            const courseResponse = await fetch(
              `/api/admin/information/courses/upload`,
              {
                method: "POST",
                headers: header,
                body: JSON.stringify(formData),
              }
            );
            if (courseResponse.ok) {
              const responseData = await courseResponse.json();
              success.push(responseData);
            } else {
              if (courseResponse.status == 409) {
                const errorData = await courseResponse.json();
                errorArr.push(`duplication : ${errorData.message}`);
              }
              if (courseResponse.status === 401) {
                const errorData = await courseResponse.json();
                errorArr.push(`denied Access : ${errorData.message}`);
              }
              const errorData = await courseResponse.json();
              errorArr.push(`error : ${errorData.message}`);
            }
          } else {
            errorArr.push(
              `row ${index} data could not be uploaded due to insufficient fields`
            );
          }
        } catch (error: any) {
          errorArr.push(`an exception occured : ${error.message}`);
        }
      },
      error: function (error) {
        console.error("Error during parsing:", error);
      },
      complete: function () {
        onClose();
        console.log(errorArr);
        errorArr.length > 0
          ? dispatch({
              type: "SHOW_TOAST",
              payload: { message: `${errorArr.toString()}`, type: "ERROR" },
            })
          : dispatch({
              type: "SHOW_TOAST",
              payload: { message: "All done!", type: "SUCCESS" },
            });
      },
    });
  };

  const handleSubmit = async (e: FormData) => {
    const name = e.get("name")?.toString();
    const description = e.get("description")?.toString();
    const code = e.get("code")?.toString();
    const sessionName = e.get("sessionName")?.toString();
    const sessionDescription = e.get("sessionDescription")?.toString();
    const sessionCode = e.get("sessionCode")?.toString();
    const durationInMinutes = e.get("durationInMinutes")?.toString();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div
        className={`p-5 rounded-3xl mx-2 ${
          state.theme.theme === "LIGHT"
            ? "bg-white shadow shadow-gray-200"
            : "bg-stone-900 shadow shadow-gray-800"
        }`}
      >
        <div>
          <h1 className="text-2xl font-bold">New Courses</h1>
          <p className="text-lg">
            you can either upload a csv file or create course manually
          </p>
        </div>
        <div className="flex items-center w-full mt-5">
          <p
            className={`w-full text-center ${
              isUploadable
                ? `font-bold px-2 py-2 ${
                    state.theme.theme === "LIGHT"
                      ? "bg-blue-50 text-blue-600"
                      : "bg-blue-950 text-blue-300"
                  } text-lg`
                : `font-bold px-2 py-2 text-lg`
            }`}
            onClick={() => setIsUploadable(true)}
          >
            Upload From File
          </p>
          <p
            className={`w-full text-center ${
              !isUploadable
                ? `font-bold px-2 py-2 ${
                    state.theme.theme === "LIGHT"
                      ? "bg-blue-50 text-blue-600"
                      : "bg-blue-950 text-blue-300"
                  } text-lg`
                : `font-bold px-2 py-2 text-lg`
            }`}
            onClick={() => setIsUploadable(false)}
          >
            Create Manually
          </p>
        </div>
        {isUploadable ? (
          <div className="mt-5 ">
            <div
              className={`border-2 border-dashed p-2 rounded-lg flex flex-col items-center py-5 gap-3 ${
                state.theme.theme === "LIGHT"
                  ? "border-gray-300"
                  : "border-stone-700"
              }`}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              {isDragging ? (
                <p className="font-semibold text-lg text-blue-700">
                  Uploading...
                </p>
              ) : (
                <p className="font-semibold text-lg text-gray-400">
                  Drag and drop a file here
                </p>
              )}
              <div className="flex items-center w-full justify-center gap-3">
                <p
                  className={`border w-full md:w-[80px] ${
                    state.theme.theme === "LIGHT"
                      ? "border-gray-400"
                      : "border-stone-600"
                  }`}
                ></p>
                <p>OR</p>
                <p
                  className={`border w-full md:w-[80px] ${
                    state.theme.theme === "LIGHT"
                      ? "border-gray-400"
                      : "border-stone-600"
                  }`}
                ></p>
              </div>
              <input
                type="file"
                onChange={handleFileInputChange}
                className="hidden"
                id="fileInput"
                accept=".csv" // Specify the file types allowed
              />
              <label
                className={`text-blue-600 font-bold text-lg text-center md:w-[200px] py-2 ${
                  state.theme.theme === "LIGHT"
                    ? "bg-blue-50"
                    : "bg-blue-950 bg-opacity-30 text-center"
                }`}
                htmlFor="fileInput"
              >
                Browse Files
              </label>
            </div>
            {file && (
              <div className="mt-4">
                <p className="text-lg font-semibold mb-2 text-gray-500">
                  Selected File:
                </p>
                <div className="flex items-center gap-6 border px-2 py-2 rounded-xl">
                  <div className="bg-gray-50 w-max p-2 rounded-xl border border-gray-100 shadow">
                    <span className="relative text-green-400 w-max">
                      <DocumentIcon className="h-10 w-10" />
                      <p className="absolute top-2 text-white left-2 right-2">
                        csv
                      </p>
                    </span>
                  </div>
                  <div className="flex flex-col items-start">
                    <p className="font-semibold text-gray-700">{file.name}</p>
                    <p className="text-gray-400 text-sm">
                      {formatBytes(file.size)}
                    </p>
                  </div>
                  <button
                    className="ml-auto bg-red-200 text-red-500 rounded-full p-1 hover:scale-105 active:scale-90"
                    onClick={handleRemoveFile}
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
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
              <button
                onClick={handleFileUpload}
                className={`text-blue-600 font-semibold text-xl w-full py-2 rounded-xl ${
                  state.theme.theme === "LIGHT"
                    ? "bg-blue-50 "
                    : "bg-blue-900 bg-opacity-20"
                }`}
              >
                Submit
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-5">
            <div>
              <form action={handleSubmit}>
                <div className="overflow-y-auto h-[60vh] custom-scrollbar px-1">
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold text-lg" htmlFor="code">
                      Code
                    </label>
                    <input
                      type="text"
                      name="code"
                      id="code"
                      className={`rounded-xl px-4 py-2 text-lg border transition-all duration-500 ${
                        state.theme.theme === "LIGHT"
                          ? "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-100 bg-white"
                          : "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-950 bg-stone-950 border-stone-800"
                      }`}
                      placeholder="Code"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold text-lg" htmlFor="name">
                      Course Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className={`rounded-xl px-4 py-2 text-lg border transition-all duration-500 ${
                        state.theme.theme === "LIGHT"
                          ? "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-100 bg-white"
                          : "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-950 bg-stone-950 border-stone-800"
                      }`}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      className="font-semibold text-lg"
                      htmlFor="description"
                    >
                      course description
                    </label>
                    <input
                      type="text"
                      name="description"
                      id="description"
                      className={`rounded-xl px-4 py-2 text-lg border transition-all duration-500 ${
                        state.theme.theme === "LIGHT"
                          ? "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-100 bg-white"
                          : "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-950 bg-stone-950 border-stone-800"
                      }`}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      className="font-semibold text-lg"
                      htmlFor="sessionName"
                    >
                      Session Name
                    </label>
                    <input
                      type="text"
                      name="sessionName"
                      id="sessionName"
                      className={`rounded-xl px-4 py-2 text-lg border transition-all duration-500 ${
                        state.theme.theme === "LIGHT"
                          ? "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-100 bg-white"
                          : "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-950 bg-stone-950 border-stone-800"
                      }`}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      className="font-semibold text-lg"
                      htmlFor="sessionDescription"
                    >
                      Session Description
                    </label>
                    <input
                      type="text"
                      name="sessionDescription"
                      id="sessionDescription"
                      className={`rounded-xl px-4 py-2 text-lg border transition-all duration-500 ${
                        state.theme.theme === "LIGHT"
                          ? "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-100 bg-white"
                          : "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-950 bg-stone-950 border-stone-800"
                      }`}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      className="font-semibold text-lg"
                      htmlFor="sessionCode"
                    >
                      Session Code
                    </label>
                    <input
                      type="text"
                      name="sessionCode"
                      id="sessionCode"
                      className={`rounded-xl px-4 py-2 text-lg border transition-all duration-500 ${
                        state.theme.theme === "LIGHT"
                          ? "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-100 bg-white"
                          : "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-950 bg-stone-950 border-stone-800"
                      }`}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      className="font-semibold text-lg"
                      htmlFor="durationInMinutes"
                    >
                      Duration In Minutes
                    </label>
                    <input
                      type="number"
                      name="durationInMinutes"
                      id="durationInMinutes"
                      className={`rounded-xl px-4 py-2 text-lg border transition-all duration-500 ${
                        state.theme.theme === "LIGHT"
                          ? "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-100 bg-white"
                          : "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-950 bg-stone-950 border-stone-800"
                      }`}
                    />
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
        )}
      </div>
    </Modal>
  );
}

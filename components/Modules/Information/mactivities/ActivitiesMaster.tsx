"use client";
import { useGlobalState } from "@/Utils/State";
import React, { useEffect, useState } from "react";
import ViewController from "./ViewController";
import SortableIcon from "@/Utils/Icons/SortableIcon";
import DateFormatter from "@/Utils/DateFormatter";
import { HidableColumns } from "@/Utils/TableUtils/HidableColumns";
import Modal from "@/Utils/Modal";
import SubmitHandlerButton from "@/Utils/SubmitHandlerButton";
import { POSTADMIN } from "@/actions/POSTRequests";
import { SERVER_ENDPOINT } from "@/ConfigFetch";

const ActivityMaster: React.FC<responseDataFetched<ActivityMaster>> = ({
  response,
}) => {
  const { state } = useGlobalState();

  const [columnNamesArr, setColumnNamesArr] = useState<string[]>([]);
  const [queryArr, setQueryArr] = useState([
    { page: 0 },
    { size: 10 }, // a default page size
    { sort: "id" },
  ]);
  const [isAddactivity, setIsAddActivity] = useState(false);
  const [ActivityArray, setActivityArray] = useState<ActivityMaster[]>([]);

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
    if (response?.content) {
      setActivityArray(response.content);
    }
  }, []);

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
            onClick={() => setIsAddActivity(true)}
          >
            + Activity
          </button>
          <ViewController
            handleHidables={handleAddItemToColumnNameArr}
            options={columnNamesArr}
            handleCustomisation={handleCustomisation}
            columnNames={[
              { columnName: "ACTIVITY NAME", field: "ACTIVITY_NAME" },
              {
                columnName: "ACTIVITY DESCRIPTION",
                field: "ACTIVITY_DESCRIPTION",
              },
              {
                columnName: "ACTIVITY CREATEDBY",
                field: "ACTIVITY_CREATEDBY",
              },
              { columnName: "DATE OF CREATION", field: "DATE_OF_CREATION" },
            ]}
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
                  stylesClassNames=" whitespace-nowrap font-bold pb-3"
                  columnNamesArray={columnNamesArr}
                  ColumnToHide="ACTIVITY_NAME"
                >
                  <SortableIcon
                    fieldName={"name"}
                    tableHeading={"ACTIVITY NAME"}
                    isSorted={queryArr.some((obj) => obj.sort === "name")}
                  />
                </HidableColumns>
                <HidableColumns
                  isColumnHeader={true}
                  stylesClassNames=" whitespace-nowrap font-bold pb-3"
                  columnNamesArray={columnNamesArr}
                  ColumnToHide="ACTIVITY_DESCRIPTION"
                >
                  <SortableIcon
                    fieldName={"programName"}
                    tableHeading={"ACTIVITY DESCRIPTION"}
                    isSorted={queryArr.some(
                      (obj) => obj.sort === "programName"
                    )}
                  />
                </HidableColumns>
                <HidableColumns
                  isColumnHeader={true}
                  stylesClassNames=" whitespace-nowrap font-bold pb-3"
                  columnNamesArray={columnNamesArr}
                  ColumnToHide="ACTIVITY_CREATEDBY"
                >
                  <SortableIcon
                    fieldName={"coordinator"}
                    tableHeading={"CREATED BY"}
                    isSorted={queryArr.some(
                      (obj) => obj.sort === "coordinator"
                    )}
                  />
                </HidableColumns>
                <HidableColumns
                  isColumnHeader={true}
                  stylesClassNames=" whitespace-nowrap font-bold pb-3"
                  columnNamesArray={columnNamesArr}
                  ColumnToHide="DATE_OF_CREATION"
                >
                  <SortableIcon
                    tableHeading={"DATE OF CREATION"}
                    isSorted={queryArr.some((obj) => obj.sort === "created")}
                  />
                </HidableColumns>
              </tr>
            </thead>
            <tbody>
              {ActivityArray.length > 0 ? (
                ActivityArray?.map((item: ActivityMaster, index) => (
                  <tr key={index}>
                    <HidableColumns
                      ColumnToHide="ACTIVITY_NAME"
                      isColumnHeader={false}
                      columnNamesArray={columnNamesArr}
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
                      {item.name}
                    </HidableColumns>
                    <HidableColumns
                      ColumnToHide="ACTIVITY_DESCRIPTION"
                      isColumnHeader={false}
                      columnNamesArray={columnNamesArr}
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
                      {item.description}
                    </HidableColumns>
                    <HidableColumns
                      ColumnToHide="ACTIVITY_CREATEDBY"
                      isColumnHeader={false}
                      columnNamesArray={columnNamesArr}
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
                      {item.createdBy}
                    </HidableColumns>
                    <HidableColumns
                      ColumnToHide="DATE_OF_CREATION"
                      isColumnHeader={false}
                      columnNamesArray={columnNamesArr}
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
                      <DateFormatter dateString={item.created} />
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
      <AddActivity
        isOpen={isAddactivity}
        onClose={() => setIsAddActivity(false)}
        setActivityArray={(value) => {
          setActivityArray((prev) => [...prev, value]);
        }}
      />
    </div>
  );
};

export default ActivityMaster;

function AddActivity({
  isOpen,
  onClose,
  setActivityArray,
}: {
  isOpen: boolean;
  onClose: () => void;
  setActivityArray: (value: any) => void;
}) {
  const { state, dispatch } = useGlobalState();
  const handleSubmit = async (e: FormData) => {
    const name = e.get("name")?.toString();
    const description = e.get("description")?.toString();
    if (!name || !description) {
      dispatch({
        type: "SHOW_TOAST",
        payload: { type: "ERROR", message: "please enter the details" },
      });
    }
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const formData: any = { name, description };
    try {
      const response = await fetch(`/api/admin/information/mactivity`, {
        method: "POST",
        headers,
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const responseData = await response.json();
        setActivityArray(formData);
        onClose();
        dispatch({
          type: "SHOW_TOAST",
          payload: { type: "SUCCESS", message: responseData.message },
        });
      } else {
        const errorData = await response.json();
        dispatch({
          type: "SHOW_TOAST",
          payload: { type: "ERROR", message: errorData.message },
        });
      }
    } catch (error: any) {
      dispatch({
        type: "SHOW_TOAST",
        payload: { type: "ERROR", message: error.message },
      });
    }
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
          <h1 className="text-2xl font-bold">New Activity</h1>
          <p className="text-lg">
            you can add another activity to be selected by participants
          </p>
        </div>
        <div>
          <form action={handleSubmit}>
            <div className="mt-5 flex flex-col gap-5">
              <div className="flex flex-col gap-3">
                <label htmlFor="Name" className="font-semibold text-lg">
                  Name
                </label>
                <input
                  type="text"
                  className={`rounded-xl px-4 py-2 text-lg border transition-all duration-500 ${
                    state.theme.theme === "LIGHT"
                      ? "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-100 bg-white"
                      : "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-950 bg-stone-950 border-stone-800"
                  }`}
                  name="name"
                  id="Name"
                  placeholder="Enter Activity name"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label htmlFor="Description" className="font-semibold text-lg">
                  Description
                </label>
                <textarea
                  className={`rounded-xl px-4 py-2 text-lg border transition-all duration-500 ${
                    state.theme.theme === "LIGHT"
                      ? "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-100 bg-white"
                      : "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-950 bg-stone-950 border-stone-800"
                  }`}
                  name="description"
                  id="Description"
                  placeholder="Enter Activity description"
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
          </form>
        </div>
      </div>
    </Modal>
  );
}

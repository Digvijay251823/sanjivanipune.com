"use client";
import useWindowDimensions from "@/Utils/Hooks/WindowDimentions";
import { useGlobalState } from "@/Utils/State";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ViewController from "./ViewController";
import Modal from "@/Utils/Modal";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { HidableColumns } from "@/Utils/TableUtils/HidableColumns";
import ChangeRole from "./ChangeRole";
import SubmitHandlerButton from "@/Utils/SubmitHandlerButton";
import { useRouter } from "next/navigation";

interface VolunteerCreation {
  firstName: string;
  lastName: string;
  initiatedName: string;
  contactNumber: string;
  waNumber: string;
  age: string;
  email: string;
  password: string;
  gender: string;
  address: string;
  serviceInterests: string;
  currentServices: string;
}

const Volunteers: React.FC<responseDataFetched<VolunteerTypes>> = ({
  response,
}) => {
  const { state, dispatch } = useGlobalState();
  const [volunteersArr, setVolunteersArr] = useState<VolunteerTypes[]>([]);
  const [columnNamesArr, setColumnNamesArr] = useState<string[]>([]);
  const { width } = useWindowDimensions();
  const [isOpenCreateVolunteer, setIsOpenCreateVolunteer] = useState(false);
  const [customisationObjs, setCustomisationObjs] = useState({
    cellSize: "normal",
  });

  useEffect(() => {
    if (response?.content) {
      setVolunteersArr(response.content);
    }
  }, []);

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
      <div className="my-3 flex items-center justify-between">
        <div></div>
        <div className="flex items-center gap-5">
          <button
            className={`my-3 px-4 py-2 text-lg rounded-xl font-semibold ${
              state.theme.theme === "LIGHT"
                ? "bg-blue-50 text-blue-500"
                : "bg-blue-950 bg-opacity-40 text-blue-300"
            }`}
            onClick={() => setIsOpenCreateVolunteer(true)}
          >
            + Volunteer
          </button>
          <ViewController
            handleCustomisation={handleCustomisation}
            handleHidables={handleAddItemToColumnNameArr}
            columnNames={[
              { columnName: "FIRST NAME", field: "First_Name_Volunteer" },
              { columnName: "LAST NAME", field: "Last_Name_Volunteer" },
              {
                columnName: "INITIATED NAME",
                field: "Initiated_Name_Volunteer",
              },
              { columnName: "PHONE", field: "Phone_Volunteer" },
              { columnName: "DOB", field: "DOB_Volunteer" },
              { columnName: "GENDER", field: "Gender_Volunteer" },
              {
                columnName: "CURRENT SERVICE",
                field: "Current_Service_Volunteer",
              },
              {
                columnName: "SERVICE Volunteers",
                field: "Service_Interested_Volunteer",
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
                  stylesClassNames=" whitespace-nowrap font-bold px-5 pb-3"
                  ColumnToHide="First_Name_Volunteer"
                >
                  FIRST NAME
                </HidableColumns>
                <HidableColumns
                  isColumnHeader={true}
                  stylesClassNames=" whitespace-nowrap font-bold px-5 pb-3"
                  ColumnToHide="Last_Name_Volunteer"
                >
                  LAST NAME
                </HidableColumns>
                <HidableColumns
                  isColumnHeader={true}
                  stylesClassNames=" whitespace-nowrap font-bold px-5 pb-3"
                  ColumnToHide="Initiated_Name_Volunteer"
                >
                  INITIATED NAME
                </HidableColumns>
                <HidableColumns
                  isColumnHeader={true}
                  stylesClassNames=" whitespace-nowrap font-bold px-5 pb-3"
                  ColumnToHide="Phone_Volunteer"
                >
                  PHONE
                </HidableColumns>
                <HidableColumns
                  isColumnHeader={true}
                  stylesClassNames=" whitespace-nowrap font-bold px-5 pb-3"
                  ColumnToHide="DOB_Volunteer"
                >
                  DOB
                </HidableColumns>
                <HidableColumns
                  isColumnHeader={true}
                  stylesClassNames=" whitespace-nowrap font-bold px-5 pb-3"
                  ColumnToHide="Gender_Volunteer"
                >
                  GENDER
                </HidableColumns>
                <HidableColumns
                  isColumnHeader={true}
                  stylesClassNames=" whitespace-nowrap font-bold px-5 pb-3"
                  ColumnToHide="Current_Service_Volunteer"
                >
                  CURRENT SERVICE
                </HidableColumns>
                <HidableColumns
                  isColumnHeader={true}
                  stylesClassNames=" whitespace-nowrap font-bold px-5 pb-3"
                  ColumnToHide="Service_Interested_Volunteer"
                >
                  SERVICE Volunteers
                </HidableColumns>
                <HidableColumns
                  isColumnHeader={true}
                  stylesClassNames=" whitespace-nowrap font-bold px-5 pb-3"
                  ColumnToHide="Service_Interested_Volunteer"
                >
                  ROLE controller
                </HidableColumns>
              </tr>
            </thead>
            <tbody>
              {volunteersArr.length > 0 ? (
                volunteersArr.map((item: VolunteerTypes, index) => (
                  <tr key={index}>
                    <HidableColumns
                      ColumnToHide="First_Name_Volunteer"
                      isColumnHeader={false}
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
                      {item.firstName}
                    </HidableColumns>
                    <HidableColumns
                      ColumnToHide="Last_Name_Volunteer"
                      isColumnHeader={false}
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
                      {item.lastName}
                    </HidableColumns>
                    <HidableColumns
                      ColumnToHide="Initiated_Name_Volunteer"
                      isColumnHeader={false}
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
                      {item.initiatedName ? (
                        item.initiatedName
                      ) : (
                        <i className="text-gray-500">null</i>
                      )}
                    </HidableColumns>
                    <HidableColumns
                      ColumnToHide="Phone_Volunteer"
                      isColumnHeader={false}
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
                      {item.contactNumber}
                    </HidableColumns>
                    <HidableColumns
                      ColumnToHide="DOB_Volunteer"
                      isColumnHeader={false}
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
                      {item.age ? (
                        item.age
                      ) : (
                        <i className="text-gray-500">null</i>
                      )}
                    </HidableColumns>
                    <HidableColumns
                      ColumnToHide="Gender_Volunteer"
                      isColumnHeader={false}
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
                      {item.gender}
                    </HidableColumns>
                    <HidableColumns
                      ColumnToHide="Current_Service_Volunteer"
                      isColumnHeader={false}
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
                      {item.currentServices ? (
                        item.currentServices
                      ) : (
                        <i className="text-gray-500">null</i>
                      )}
                    </HidableColumns>
                    <HidableColumns
                      ColumnToHide="Service_Interested_Volunteer"
                      isColumnHeader={false}
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
                      {item.serviceInterests ? (
                        item.serviceInterests
                      ) : (
                        <i className="text-gray-500">null</i>
                      )}
                    </HidableColumns>
                    <HidableColumns
                      ColumnToHide="Service_Interested_Volunteer"
                      isColumnHeader={false}
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
                      <ChangeRole volunteer={item} />
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
      <CreateVolunteer
        isOpen={isOpenCreateVolunteer}
        onClose={() => setIsOpenCreateVolunteer(false)}
        setVolunteersArr={(newVolunteer: VolunteerTypes) => {
          console.log(newVolunteer);
          setVolunteersArr((prev) => [...prev, newVolunteer]);
        }}
      />
    </div>
  );
};

export default Volunteers;

function CreateVolunteer({
  isOpen,
  onClose,
  setVolunteersArr,
}: {
  isOpen: boolean;
  onClose: () => void;
  setVolunteersArr: (volunteer: VolunteerTypes) => void;
}) {
  const { state, dispatch } = useGlobalState();
  const [incharge, setInCharge] = useState(0);

  const [SelectedGender, setSelectedGender] = useState("");
  const [errors, setErrors] = useState({});
  const router = useRouter();
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("/api/admin/information/volunteers");
        if (response.ok) {
          const responseData = await response.json();
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

  function Formvalidatation(formData: VolunteerCreation) {
    Array(formData).forEach((item) => console.log(item));
  }

  const handleVolunteerCreation = async (e: FormData) => {
    const firstName = e.get("firstName")?.toString();
    const lastName = e.get("lastName")?.toString();
    const initiatedName = e.get("initiatedName")?.toString();
    const contactNumber = e.get("contactNumber")?.toString();
    const waNumber = e.get("waNumber")?.toString();
    const age = e.get("age")?.toString();
    const email = e.get("email")?.toString().toLocaleLowerCase();
    const password = e.get("password")?.toString();
    const gender = SelectedGender;
    const address = e.get("address")?.toString();
    const serviceInterests = e.get("serviceInterests")?.toString();
    const currentServices = e.get("currentServices")?.toString();
    const formData: any = {
      firstName,
      lastName,
      initiatedName,
      contactNumber,
      waNumber,
      age,
      email,
      password,
      gender,
      address,
      serviceInterests,
      currentServices,
    };
    Formvalidatation(formData);
    setVolunteersArr(formData);
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    try {
      const response = await fetch(`/api/admin/information/volunteer/create`, {
        method: "POST",
        headers,
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const responseData = await response.json();
        setVolunteersArr(formData);
        dispatch({
          type: "SHOW_TOAST",
          payload: { message: responseData.message, type: "SUCCESS" },
        });
      } else {
        const responseData = await response.json();
        dispatch({
          type: "SHOW_TOAST",
          payload: { message: responseData.message, type: "ERROR" },
        });
      }
    } catch (error: any) {
      dispatch({
        type: "SHOW_TOAST",
        payload: { message: error.message, type: "ERROR" },
      });
    } finally {
      onClose();
      router.refresh();
    }
  };

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
          Create Volunteer
        </h1>
        <div className="lg:w-[40vw] md:w-[60vw] w-[95vw] max-h-[80vh] overflow-y-auto custom-scrollbar px-1">
          <form action={handleVolunteerCreation} className="mt-5 w-full">
            <div className="w-full flex flex-col gap-3">
              <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                <div className="flex flex-col gap-2">
                  <label
                    className="font-semibold text-lg"
                    htmlFor="first_Name"
                    id="firstName"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    className={`rounded-xl px-4 py-2 text-lg border transition-all duration-500 ${
                      state.theme.theme === "LIGHT"
                        ? "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-100 bg-white"
                        : "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-950 bg-stone-950 border-stone-800"
                    }`}
                    required
                    id="first_name"
                    placeholder="John"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    className="font-semibold text-lg"
                    htmlFor="last_Name"
                    id="lastName"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    className={`rounded-xl px-4 py-2 text-lg border transition-all duration-500 ${
                      state.theme.theme === "LIGHT"
                        ? "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-100 bg-white"
                        : "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-950 bg-stone-950 border-stone-800"
                    }`}
                    required
                    id="last_Name"
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label
                  className="font-semibold text-lg"
                  htmlFor="Initiated_Name"
                >
                  Initiated Name
                </label>
                <input
                  type="text"
                  name="initiatedName"
                  className={`rounded-xl px-4 py-2 text-lg border transition-all duration-500 ${
                    state.theme.theme === "LIGHT"
                      ? "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-100 bg-white"
                      : "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-950 bg-stone-950 border-stone-800"
                  }`}
                  id="Initiated_Name"
                  placeholder="Govindnath Das"
                />
              </div>
              <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                <div className="flex flex-col gap-2">
                  <label
                    className="font-semibold text-lg"
                    htmlFor="wa_Number"
                    id="waNumber"
                  >
                    WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    name="waNumber"
                    className={`rounded-xl px-4 py-2 text-lg border transition-all duration-500 ${
                      state.theme.theme === "LIGHT"
                        ? "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-100 bg-white"
                        : "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-950 bg-stone-950 border-stone-800"
                    }`}
                    required
                    id="wa_Number"
                    placeholder="7878899532"
                    maxLength={10}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    className="font-semibold text-lg"
                    htmlFor="contact_Number"
                    id="contactNumber"
                  >
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    name="contactNumber"
                    className={`rounded-xl px-4 py-2 text-lg border transition-all duration-500 ${
                      state.theme.theme === "LIGHT"
                        ? "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-100 bg-white"
                        : "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-950 bg-stone-950 border-stone-800"
                    }`}
                    required
                    id="contact_Number"
                    placeholder="7878899543"
                    maxLength={10}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label
                  className="font-semibold text-lg"
                  htmlFor="Email"
                  id="email"
                >
                  email
                </label>
                <input
                  type="email"
                  name="email"
                  className={`rounded-xl px-4 py-2 text-lg border transition-all duration-500 ${
                    state.theme.theme === "LIGHT"
                      ? "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-100 bg-white"
                      : "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-950 bg-stone-950 border-stone-800"
                  }`}
                  required
                  id="Email"
                  placeholder="xyz@example.com"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  className="font-semibold text-lg"
                  htmlFor="Password"
                  id="password"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  className={`rounded-xl px-4 py-2 text-lg border transition-all duration-500 ${
                    state.theme.theme === "LIGHT"
                      ? "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-100 bg-white"
                      : "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-950 bg-stone-950 border-stone-800"
                  }`}
                  required
                  id="Password"
                  placeholder="***********"
                />
              </div>
              <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                <div className="flex flex-col gap-2">
                  <label
                    className="font-semibold text-lg"
                    htmlFor="Age"
                    id="age"
                  >
                    Age
                  </label>
                  <input
                    type="number"
                    name="age"
                    className={`rounded-xl px-4 py-2 text-lg border transition-all duration-500 ${
                      state.theme.theme === "LIGHT"
                        ? "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-100 bg-white"
                        : "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-950 bg-stone-950 border-stone-800"
                    }`}
                    required
                    id="Age"
                    placeholder="37"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    className="font-semibold text-lg"
                    htmlFor="Gender"
                    id="gender"
                  >
                    Gender
                  </label>
                  <MenuOthersDropDown
                    setSelected={(value) => setSelectedGender(value)}
                    DataArr={["MALE", "FEMALE"]}
                    position="up"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label
                  className="font-semibold text-lg"
                  htmlFor="Address"
                  id="address"
                >
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  className={`rounded-xl px-4 py-2 text-lg border transition-all duration-500 ${
                    state.theme.theme === "LIGHT"
                      ? "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-100 bg-white"
                      : "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-950 bg-stone-950 border-stone-800"
                  }`}
                  required
                  id="Address"
                  placeholder="Pune-37"
                />
              </div>
              <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                <div className="flex flex-col gap-2">
                  <label
                    className="font-semibold text-lg"
                    htmlFor="Service_interests"
                    id="serviceInterests"
                  >
                    Service Interests
                  </label>
                  <input
                    type="text"
                    name="serviceInterests"
                    className={`rounded-xl px-4 py-2 text-lg border transition-all duration-500 ${
                      state.theme.theme === "LIGHT"
                        ? "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-100 bg-white"
                        : "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-950 bg-stone-950 border-stone-800"
                    }`}
                    required
                    id="Service_interests"
                    placeholder="Chanting Holy Name"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    className="font-semibold text-lg"
                    htmlFor="Current_Service"
                    id="gender"
                  >
                    Current Service
                  </label>
                  <input
                    type="text"
                    name="currentServices"
                    className={`rounded-xl px-4 py-2 text-lg border transition-all duration-500 ${
                      state.theme.theme === "LIGHT"
                        ? "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-100 bg-white"
                        : "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-950 bg-stone-950 border-stone-800"
                    }`}
                    required
                    id="Current_Service"
                    placeholder="Temple Seva"
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

function MenuOthersDropDown({
  setSelected,
  DataArr,
  defaultVal,
  position,
}: {
  setSelected: (value: string) => void;
  DataArr: string[];
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
                DataArr.length > 10 ? "md:h-[40vh] h-[60vh]" : "h-full"
              }`}
              role="none"
            >
              {DataArr?.map((item: any, index: number) => (
                <li
                  key={index}
                  onClick={() => {
                    setSelectedOption(item);
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

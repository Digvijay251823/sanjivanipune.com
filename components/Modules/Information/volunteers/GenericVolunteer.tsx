"use client";
import Modal from "@/Utils/Modal";
import { useGlobalState } from "@/Utils/State";
import SubmitHandlerButton from "@/Utils/SubmitHandlerButton";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

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

export default function CreateVolunteer() {
  const { state, dispatch } = useGlobalState();
  const [incharge, setInCharge] = useState(0);
  const [volunteersArr, setVolunteersArr] = useState([]);
  const [SelectedGender, setSelectedGender] = useState("");
  const [errors, setErrors] = useState({});
  const router = useRouter();
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
    }
  };

  return (
    <div>
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
    </div>
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

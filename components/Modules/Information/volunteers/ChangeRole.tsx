import { SERVER_ENDPOINT } from "@/ConfigFetch";
import Modal from "@/Utils/Modal";
import { useGlobalState } from "@/Utils/State";
import SubmitHandlerButton from "@/Utils/SubmitHandlerButton";
import { POST, POSTADMIN } from "@/actions/POSTRequests";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import React, { useCallback, useEffect, useRef, useState } from "react";

function ChangeRole({ volunteer }: { volunteer: VolunteerTypes }) {
  const { state, dispatch } = useGlobalState();
  const [selectedRole, setSelectedRole] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const handleSubmitRole = async (e: FormData) => {
    const email = e.get("email")?.toString();
    const password = e.get("password")?.toString();
    const role = selectedRole;
    const formData: any = {
      email,
      password,
      role,
    };
    console.log(formData);
    if (!email || !password || role === "") {
      dispatch({
        type: "SHOW_TOAST",
        payload: { message: "please fill the details", type: "ERROR" },
      });
      return;
    }

    try {
      const response = await fetch(`/api/auth/changerole`, {
        method: "POST",
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const responseData = await response.json();
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
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`px-2 py-1.5 ${
          state.theme.theme === "LIGHT"
            ? "bg-blue-50 text-blue-600"
            : "bg-blue-950 text-blue-300"
        }`}
      >
        Change Role
      </button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="w-full min-h-screen flex flex-col items-center mb-10">
          <p className="my-10 text-center text-4xl font-bold ">Change Role</p>

          <div
            className={`${
              state.theme.theme === "LIGHT"
                ? "bg-gray-50"
                : "bg-stone-900 bg-opacity-20"
            } md:p-10 p-6 mt-5 rounded-[60px]`}
          >
            <form action={handleSubmitRole} className="md:w-[400px] w-[80vw]">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="Email"
                    className="font-semibold text-xl mr-auto"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="Email"
                    name="email"
                    className={`px-4 py-4 text-lg w-full rounded-2xl  focus:ring-4 outline-none border transition-all duration-500 ${
                      state.theme.theme === "LIGHT"
                        ? "focus:border-blue-600 bg-gray-100 focus:ring-blue-100 border-gray-200"
                        : "focus:border-blue-500 bg-stone-950 focus:ring-blue-950 border-stone-800"
                    }`}
                    placeholder="xyz@example.com"
                    defaultValue={volunteer.email}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="password"
                    className="font-semibold text-xl mr-auto"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className={`px-4 py-4 text-lg w-full rounded-2xl  focus:ring-4 outline-none border transition-all duration-500 ${
                      state.theme.theme === "LIGHT"
                        ? "focus:border-blue-600 bg-gray-100 focus:ring-blue-100 border-gray-200"
                        : "focus:border-blue-500 bg-stone-950 focus:ring-blue-950 border-stone-800 active:bg-stone-950"
                    }`}
                    placeholder="***********"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="role"
                    className="font-semibold text-xl mr-auto"
                  >
                    Role
                  </label>
                  <MenuOthersDropDown
                    setSelected={(text) => setSelectedRole(text)}
                    DataArr={["ROLE_ADMIN", "ROLE_VOLUNTEER", "ROLE_USER"]}
                    position="up"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between md:gap-5 gap-3 mt-5">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
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
    </>
  );
}

export default ChangeRole;

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
        className={`flex items-center justify-between border px-4 py-4 text-lg w-full rounded-2xl gap-5 focus:ring-4 outline-none focus:border font-semibold transition-all duration-500 ${
          state.theme.theme === "LIGHT"
            ? "focus:border-blue-600 bg-gray-100 focus:ring-blue-100 border-gray-200"
            : "focus:border-blue-500 bg-stone-950 focus:ring-blue-950 border-stone-800 active:bg-stone-950"
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
            position === "up" ? "bottom-0 mb-20" : "mt-2 right-0"
          } w-full rounded-2xl shadow-lg ${
            state.theme.theme === "LIGHT"
              ? "bg-white border-gray-300"
              : "bg-stone-900 border border-stone-700"
          } ring-1 ring-black ring-opacity-5 focus:outline-none py-2 px-0.5`}
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
              className={`flex flex-col gap-2 overflow-y-auto ${
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
                  className={`px-2 py-2 ${
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

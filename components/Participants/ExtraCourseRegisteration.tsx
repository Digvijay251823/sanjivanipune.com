"use client";
import LoadingComponent from "@/Utils/Icons/LoadingComponent";
import { useGlobalState } from "@/Utils/State";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { GenericSuccessPage } from "./GenericSuccessPage";
import { GenericErrorPage } from "./GenericErrorPage";
import { useRouter } from "next/navigation";
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useFormStatus } from "react-dom";
import Modal from "@/Utils/Modal";

const ExtraCourseRegisteration: React.FC<
  responseDataFetched<LevelToDisplay>
> = ({ response }) => {
  const { state, dispatch } = useGlobalState();
  const [selectedGender, setSelectedGender] = useState("MALE");
  const [isOpenWarning, setIsOpenWarning] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<LevelToDisplay | any>({});
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenPoster, setIsOpenPoster] = useState(false);
  const [Errorr, setErrorr] = useState<{ type: string; message: string } | any>(
    {}
  );
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [focusMobile, setFocusMobile] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const { push } = useRouter();
  const [participantData, setParticipantData] = useState<
    PariticipantData | any
  >({});

  useEffect(() => {
    if (phoneNumber.length === 10) {
      (async () => {
        try {
          const response = await fetch(
            `/api/participants/phone/${phoneNumber}`
          );
          if (response.ok) {
            const responseData = await response.json();
            setIsOpen(false);
            setParticipantData(responseData.content);
          } else {
            if (response.status === 404) {
              ///consent screen
              setParticipantData({});
              setIsOpen(true);
              localStorage.setItem("PHONE", phoneNumber);
            }
            const errorData = await response.json();
            dispatch({
              type: "SHOW_TOAST",
              payload: {
                type: "ERROR",
                message: errorData.message || errorData.statusText,
              },
            });
          }
        } catch (error: any) {
          dispatch({
            type: "SHOW_TOAST",
            payload: { type: "ERROR", message: error.message },
          });
        }
      })();
    }
  }, [phoneNumber]);

  async function handleSubmitGeneralRegisteration(e: FormData) {
    const formData: any = {
      participantId: participantData.id,
      levelId: selectedLevel.id,
    };

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    try {
      const response = await fetch(`/api/participants/extracourse`, {
        method: "POST",
        headers,
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();
        setIsSuccess(true);

        localStorage.removeItem("PHONE");
        dispatch({
          type: "SHOW_TOAST",
          payload: { type: "SUCCESS", message: responseData.message },
        });
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
        setIsOpenWarning(true);
        dispatch({
          type: "SHOW_TOAST",
          payload: { type: "ERROR", message: errorData.message },
        });
      }
    } catch (error: any) {
      dispatch({
        type: "SHOW_TOAST",
        payload: {
          type: "ERROR",
          message: error.message || "something went wrong",
        },
      });
    }
  }

  async function handleSubmitGeneralRegisterationIfNotRegistered(e: FormData) {
    const firstName = e.get("firstName")?.toString();
    const lastName = e.get("lastName")?.toString();
    const contactNumber = phoneNumber;
    const waNumber = phoneNumber;
    const age = e.get("age")?.toString();
    const city = e.get("city")?.toString();
    const RegisterationData = {
      firstName,
      lastName,
      contactNumber,
      waNumber,
      age,
      gender: selectedGender,
      city,
    };
    try {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      const responseRegister = await fetch(`/api/participants/registration`, {
        method: "POST",
        headers,
        body: JSON.stringify(RegisterationData),
      });
      if (!responseRegister.ok) {
        const errorData = await responseRegister.json();
        setIsOpenWarning(true);
        setErrorMessage(errorData.message);
        dispatch({
          type: "SHOW_TOAST",
          payload: { type: "ERROR", message: errorData.message },
        });
        return;
      }
      ///second request to find the participant created
      const responseParticipant = await fetch(
        `/api/participants/phone/${phoneNumber}`
      );
      if (!responseParticipant.ok) {
        const errorData = await responseParticipant.json();
        setIsOpenWarning(true);
        setErrorMessage(errorData.message);
        dispatch({
          type: "SHOW_TOAST",
          payload: {
            type: "ERROR",
            message: errorData.message || errorData.statusText,
          },
        });
      } else {
        const responseData = await responseParticipant.json();
        setParticipantData(responseData.content);
        const formData = {
          participantId: responseData.content.id,
          levelId: selectedLevel.id,
        };
        const responseRegister = await fetch(`/api/participants/extracourse`, {
          method: "POST",
          headers,
          body: JSON.stringify(formData),
        });
        if (!responseRegister.ok) {
          const errorData = await responseRegister.json();
          dispatch({
            type: "SHOW_TOAST",
            payload: { type: "ERROR", message: errorData.message },
          });
        } else {
          localStorage.removeItem("PHONE");
          setIsSuccess(true);
        }
      }
    } catch (error: any) {
      dispatch({
        type: "SHOW_TOAST",
        payload: { type: "ERROR", message: error.message },
      });
      return;
    }
  }
  const handleChangePhoneNumber = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    if (!isNaN(Number(e.target.value))) {
      if (e.target.value.length > 10) {
        setErrorr({
          type: "phoneNumber",
          message: "phone Number can only contain 10 digits",
        });
        return;
      } else if (e.target.value.length < 10) {
        setErrorr({
          type: "phoneNumber",
          message: "phone Number can only contain 10 digits",
        });
      }
    } else {
      setErrorr({
        type: "phoneNumber",
        message: "invalid type of phonenumber",
      });
      return;
    }
    setPhoneNumber(e.target.value);
  };
  return (
    <div className="flex flex-col min-h-screen w-screen items-center">
      <div className="py-10 mx-5">
        <h1 className="text-4xl font-bold">Registeration</h1>
        <h4 className="text-lg">
          Select a program from below that you are interested in
        </h4>
      </div>

      <div
        className={`md:p-5 rounded-[40px] p-4  mx-3 mb-6 ${
          state.theme.theme === "LIGHT"
            ? "bg-gray-50"
            : "bg-stone-900 bg-opacity-30"
        }`}
      >
        <form className="md:w-[400px] w-[80vw]">
          <div className="flex flex-col w-full gap-5">
            <div className="flex flex-col w-full gap-3">
              <label htmlFor="Phone_Number" className="font-bold md:text-xl">
                Phone Number
              </label>
              <div
                onFocus={() => setFocusMobile(true)}
                onBlur={() => setFocusMobile(false)}
                className={`border ${
                  focusMobile && "ring-4"
                } py-1 px-1 text-lg rounded w-full transition-all duration-500 flex items-center ${
                  state.theme.theme === "LIGHT"
                    ? `bg-white ${
                        focusMobile
                          ? "ring-blue-100 border-blue-600"
                          : "border-gray-400"
                      } `
                    : `bg-stone-950  ${
                        focusMobile
                          ? "border-blue-700 ring-blue-950"
                          : "border-stone-700"
                      } `
                }`}
              >
                <input
                  type="tel"
                  id="Phone_Number"
                  value={phoneNumber}
                  className={`outline-none w-full ${
                    state.theme.theme === "LIGHT" ? "bg-white" : "bg-stone-950"
                  }`}
                  onChange={handleChangePhoneNumber}
                  max={9999999999}
                />
              </div>
            </div>
          </div>
        </form>
        <form
          action={
            isOpen
              ? handleSubmitGeneralRegisterationIfNotRegistered
              : handleSubmitGeneralRegisteration
          }
        >
          <div className="w-full my-5">
            {Object.keys(participantData).length > 0 ? (
              <div>
                <p className="font-extrabold text-2xl ">Hare Krishna!!</p>
                <p className="text-xl font-semibold">{`${participantData.firstName} ${participantData.lastName}`}</p>
              </div>
            ) : null}
          </div>
          {isOpen && (
            <div
              className={`p-2 rounded-xl flex flex-col gap-4 my-4 ${
                state.theme.theme === "LIGHT" ? "bg-white" : "bg-stone-950"
              }`}
            >
              <p className="text-center font-semibold text-xl text-orange-400">
                Your Number Is Not Registered Please Fill Additional Details
              </p>
              <div className="flex flex-col gap-2">
                <label htmlFor="firstName" className="font-bold text-lg">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  className={`outline-none w-full border focus:ring-4 py-1.5 px-4  ${
                    state.theme.theme === "LIGHT"
                      ? `bg-white focus:ring-blue-100 focus:border-blue-600 border-gray-400`
                      : `bg-stone-950 focus:border-blue-700 focus:ring-blue-950 border-stone-700`
                  }`}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="lastName" className="font-bold text-lg">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  className={`outline-none w-full border focus:ring-4 py-1.5 px-4  ${
                    state.theme.theme === "LIGHT"
                      ? `bg-white focus:ring-blue-100 focus:border-blue-600 border-gray-400`
                      : `bg-stone-950 focus:border-blue-700 focus:ring-blue-950 border-stone-700`
                  }`}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="age" className="font-bold text-lg">
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  id="age"
                  className={`outline-none w-full border focus:ring-4 py-1.5 px-4  ${
                    state.theme.theme === "LIGHT"
                      ? `bg-white focus:ring-blue-100 focus:border-blue-600 border-gray-400`
                      : `bg-stone-950 focus:border-blue-700 focus:ring-blue-950 border-stone-700`
                  }`}
                  max={100}
                  min={3}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="gender" className="font-bold text-lg">
                  Gender
                </label>
                <MenuToggleComponent
                  DataArr={["MALE", "FEMALE"]}
                  setSelected={(value) => setSelectedGender(value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="city" className="font-bold text-lg">
                  Where Do You Live In Pune
                </label>
                <input
                  name="city"
                  id="city"
                  type="type"
                  className={`outline-none w-full border focus:ring-4 py-1.5 px-4  ${
                    state.theme.theme === "LIGHT"
                      ? `bg-white focus:ring-blue-100 focus:border-blue-600 border-gray-400`
                      : `bg-stone-950 focus:border-blue-700 focus:ring-blue-950 border-stone-700`
                  }`}
                  required
                />
              </div>
            </div>
          )}
          <div className="flex flex-col gap-3">
            <label className="font-bold text-xl ">Select Programs</label>
            <MenuOthersDropDown
              setIsOpenPoster={(value: boolean) => setIsOpenPoster(value)}
              DataArr={response.content}
              setSelected={(value: any) => setSelectedLevel(value)}
            />
          </div>
          <div className="mt-10 flex justify-center">
            <SubmitHandlerButton />
          </div>
        </form>
      </div>
      <GenericErrorPage
        isOpen={isOpenWarning}
        onClose={() => {
          setIsOpenWarning(false);
        }}
        errorMessage={errorMessage}
      />
      <GenericSuccessPage
        isOpen={isSuccess}
        onClose={() => {
          setIsSuccess(false);
          setIsOpen(false);
          setPhoneNumber("");
          setParticipantData({});
          localStorage.removeItem("PHONE");
        }}
        successMessage="Successfully registered"
      />
      <CourseDetailsOverlay
        item={selectedLevel.posterUrl}
        isOpenPoster={isOpenPoster}
        setIsOpenPoster={(value: boolean) => setIsOpenPoster(value)}
      />
    </div>
  );
};

export default ExtraCourseRegisteration;

function MenuOthersDropDown({
  setIsOpenPoster,
  setSelected,
  DataArr,
}: {
  setIsOpenPoster: (value: boolean) => void;
  setSelected: (value: LevelToDisplay) => void;
  DataArr: LevelToDisplay[];
}) {
  const [isSelectionOpen, toggleSelection] = useState(false);
  const { state } = useGlobalState();
  const menuRef: any = useRef();
  const [selectedOption, setSelectedOption] = useState("");
  const [modalStyle, setModalStyle] = useState({
    transform: "scale(0.95)",
    opacity: 0,
  });

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
    <div
      className="relative inline-block text-left w-full text-xl"
      ref={menuRef}
    >
      <button
        type="button"
        className={`flex items-center justify-between border px-2 py-2.5 rounded-xl gap-5 w-full focus:ring-4 outline-none focus:border font-semibold text-xl ${
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
          className={`origin-top-left absolute font-semibold text-lg z-[2500] w-full rounded-lg shadow-lg mb-14 bottom-0 ${
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
            <div
              className={`flex flex-col gap-3 overflow-y-auto ${
                DataArr.length > 10
                  ? "md:h-[40vh] h-[60vh]"
                  : "h-[40vh] custom-scrollbar"
              }`}
              role="none"
            >
              {DataArr?.map((item: LevelToDisplay, index: number) => (
                <div
                  key={index}
                  onClick={() => {
                    setSelectedOption(item.name);
                    setSelected(item);
                    toggleSelection(false);
                  }}
                  className={`px-2 py-1.5 rounded-lg flex items-center gap-2 ${
                    item.name === selectedOption && "bg-blue-300"
                  } ${
                    state.theme.theme === "LIGHT"
                      ? "hover:bg-gray-100 "
                      : "hover:bg-stone-700"
                  }`}
                >
                  <p
                    className={`border-r pr-1 ${
                      state.theme.theme === "LIGHT"
                        ? "border-r-gray-300"
                        : "border-r-stone-700"
                    }`}
                  >
                    {item.displayName}
                  </p>
                  {item.sessionTime ? (
                    <p
                      className={`border-r pr-1 ${
                        state.theme.theme === "LIGHT"
                          ? "border-r-gray-300"
                          : "border-r-stone-700"
                      }`}
                    >
                      {formatTime(item.sessionTime)}
                    </p>
                  ) : (
                    <></>
                  )}
                  <p>{item.sessionDay}</p>
                  <p
                    onClick={() => setIsOpenPoster(true)}
                    className={
                      state.theme.theme === "LIGHT"
                        ? "bg-red-300 text-red-800 px-3 rounded-full"
                        : "bg-red-900 text-red-300 px-3 rounded-full"
                    }
                  >
                    i
                  </p>
                </div>
              ))}
            </div>
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

function SubmitHandlerButton() {
  const { state } = useGlobalState();
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <div
          className={`text-blue-600 font-semibold text-xl w-full py-2 rounded-xl flex justify-center`}
        >
          <LoadingComponent />
        </div>
      ) : (
        <button
          type="submit"
          className={`max-w-[300px] w-full py-2 text-xl font-bold rounded-xl ${
            state.theme.theme === "LIGHT"
              ? "bg-black text-white"
              : "text-black bg-white"
          }`}
          disabled={pending}
        >
          Submit
        </button>
      )}
    </>
  );
}

function MenuToggleComponent({
  setSelected,
  DataArr,
  position,
}: {
  setSelected: (value: string) => void;
  DataArr: string[];
  position?: string;
}) {
  const [isSelectionOpen, toggleSelection] = useState(false);
  const { state } = useGlobalState();
  const menuRef: any = useRef();
  const [selectedOption, setSelectedOption] = useState("MALE");
  const [modalStyle, setModalStyle] = useState({
    transform: "scale(0.95)",
    opacity: 0,
  });

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
        className={`flex items-center justify-between border px-2 py-1.5 gap-5 w-full focus:ring-4 outline-none focus:border font-semibold ${
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
          } ring-1 ring-black ring-opacity-5 focus:outline-none py-2 px-1`}
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
              className={`flex flex-col gap-3 overflow-y-auto h-full custom-scrollbar`}
              role="none"
            >
              {DataArr?.map((item: string, index: number) => (
                <li
                  key={index}
                  onClick={() => {
                    setSelectedOption(item);
                    setSelected(item);
                    toggleSelection(false);
                  }}
                  className={`px-2 py-1.5 rounded-lg ${
                    item === selectedOption && "bg-blue-300"
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
///if somebody clicks on the i button then a popup will appear and below is its component
function CourseDetailsOverlay({
  item,
  isOpenPoster,
  setIsOpenPoster,
}: {
  item: string;
  setIsOpenPoster: (value: boolean) => void;
  isOpenPoster: boolean;
}) {
  const { state } = useGlobalState();
  return (
    <>
      <Modal isOpen={isOpenPoster} onClose={() => setIsOpenPoster(false)}>
        {item ? (
          <div
            className={`rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto ${
              state.theme.theme === "LIGHT" ? "bg-white" : "bg-stone-900"
            }`}
          >
            <img
              src={item}
              className="w-[90vw] md:w-[400px] rounded-t-2xl"
              onError={(error) => console.log(error)}
              alt="Poster-Image"
            />
            <div className="flex justify-center">
              <button
                onClick={() => setIsOpenPoster(false)}
                className={`flex justify-center py-2 rounded-lg w-[100px] my-5 font-bold ${
                  state.theme.theme === "LIGHT"
                    ? "bg-blue-500 text-white"
                    : "bg-blue-700 text-white"
                }`}
              >
                Ok
              </button>
            </div>
          </div>
        ) : (
          <div
            className={`md:w-[300px] w-[90vw] text-center py-10 rounded-[40px] flex flex-col items-center gap-10 ${
              state.theme.theme === "LIGHT"
                ? "bg-white shadow-lg"
                : "bg-stone-900 shadow-black shadow-lg"
            }`}
          >
            <p className="font-bold text-xl">No Poster is configured</p>
            <button
              onClick={() => setIsOpenPoster(false)}
              className={`flex text-center w-[100px] justify-center py-1.5 rounded-lg ${
                state.theme.theme === "LIGHT" ? "bg-blue-500" : "bg-blue-700"
              }`}
            >
              Ok
            </button>
          </div>
        )}
      </Modal>
    </>
  );
}

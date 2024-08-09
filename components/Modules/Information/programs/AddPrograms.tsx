import Modal from "@/Utils/Modal";
import { useGlobalState } from "@/Utils/State";
import SubmitHandlerButton from "@/Utils/SubmitHandlerButton";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";

const AudienceTypes = [
  { name: "all", value: "ALL" },
  { name: "children", value: "CHILDREN" },
  { name: "boys", value: "BOYS" },
  { name: "girls", value: "GIRLS" },
  { name: "family", value: "FAMILY" },
  { name: "couple", value: "COUPLE" },
];
const ProgramType = [
  { name: "TempleProgram", value: "TEMPLE" },
  { name: "SocietyProgram", value: "SOCIETY" },
  { name: "CollegeProgram", value: "COLLEGE" },
];

export default function AddProgram({
  isOpen,
  onClose,
  setProgramArray,
}: {
  isOpen: boolean;
  onClose: () => void;
  setProgramArray: (newState: ProgramsData) => void;
}) {
  const { state, dispatch } = useGlobalState();
  const [incharge, setInCharge] = useState(0);
  const [mentor, setMentor] = useState(0);
  const [coordinator, setCoordinator] = useState(0);
  const [preacher, setPreacher] = useState(0);
  const [programType, setProgramtype] = useState("");
  const [AudienceType, setAudienceType] = useState("");
  const [volunteersArr, setVolunteersArr] = useState([]);
  const [errors, setErrors] = useState<any>({});
  const [formState, setFormState] = useState<any>({
    name: "",
    description: "",
    incharge: 0,
    preacher: 0,
    mentor: 0,
    coordinator: 0,
    audienceType: "",
    programType: "",
    location: "",
  });

  const validateStep = (formState: any) => {
    const requiredFields = [
      "name",
      "description",
      "incharge",
      "preacher",
      "mentor",
      "coordinator",
      "audienceType",
      "programType",
      "location",
    ];
    const stepErrors: any = {};

    requiredFields.forEach((field: any) => {
      if (!formState[field]) {
        stepErrors[field] = "This field is required";
      }
    });

    setErrors(stepErrors);

    return Object.keys(stepErrors).length === 0; // Return true if no errors
  };

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    if (
      name === "mentor" ||
      name === "coordinator" ||
      name === "preacher" ||
      name === "incharge"
    ) {
      if (Number(value) === 0) {
        setErrors((prevErrors: any) => ({
          ...prevErrors,
          [name]: "id cannot be 0",
        }));
      }
    }
    delete errors[name];
    setFormState((prevFormState: any) => ({
      ...prevFormState,
      [name]: value,
    }));
  }
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

  async function handleCreateProgram(e: FormData) {
    const name = e.get("name")?.valueOf();
    const description = e.get("description")?.valueOf();
    const location = e.get("location")?.valueOf();

    const formData: any = {
      name: name,
      description: description,
      incharge: incharge,
      preacher: preacher,
      mentor: mentor,
      coordinator: coordinator,
      audienceType: AudienceType,
      programType: programType,
      location: location,
    };
    if (!validateStep(formData)) {
      return;
    }
    setProgramArray(formData);
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    try {
      const response = await fetch(`/api/admin/information/programs`, {
        method: "POST",
        headers,
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        dispatch({
          type: "SHOW_TOAST",
          payload: { message: "Program Created Successfully", type: "SUCCESS" },
        });
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
        payload: {
          message: error.message || "something unexpected happened",
          type: "ERROR",
        },
      });
    } finally {
      onClose();
    }
  }

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
          Create Program
        </h1>
        <div className="lg:w-[40vw] md:w-[60vw] w-[95vw] max-h-[80vh] overflow-y-auto custom-scrollbar px-1">
          <form action={handleCreateProgram} className="mt-5 w-full">
            <div className="w-full flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <label
                  className="font-semibold text-lg"
                  htmlFor="Program_Name"
                  id="name"
                >
                  Program Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  className={`rounded-xl px-4 py-2 text-lg border transition-all duration-500 ${
                    state.theme.theme === "LIGHT"
                      ? `${
                          errors.name
                            ? "border-red-600 outline-none ring-4 ring-red-100 bg-white"
                            : "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-100 bg-white"
                        }`
                      : `${
                          errors.name
                            ? "border-red-500 outline-none ring-4 ring-red-950 bg-stone-900"
                            : "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-950 bg-stone-950 border-stone-800"
                        }`
                  }`}
                  id="Program_Name"
                  placeholder="Gitasar Batch 12"
                />
                {errors.name && (
                  <p className="text-red-500">This Field iS required</p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label
                  className="font-semibold text-lg"
                  htmlFor="Program_Description"
                >
                  Program Description
                </label>
                <textarea
                  name="description"
                  value={formState.description}
                  onChange={(e) => {
                    const event: any = {
                      target: {
                        name: "description",
                        value: e.target.value,
                      },
                    };
                    handleChange(event);
                  }}
                  className={`rounded-xl px-4 py-2 text-lg border transition-all duration-500 ${
                    state.theme.theme === "LIGHT"
                      ? `${
                          errors.description
                            ? "border-red-600 outline-none ring-4 ring-red-100 bg-white"
                            : "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-100 bg-white"
                        }`
                      : `${
                          errors.description
                            ? "border-red-500 outline-none ring-4 ring-red-950 bg-stone-900"
                            : "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-950 bg-stone-950 border-stone-800"
                        }`
                  }`}
                  id="Program_Description"
                  placeholder="something description"
                />
                {errors.description && (
                  <p className="text-red-500">This Field iS required</p>
                )}
              </div>
              <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                <div className="flex flex-col gap-3">
                  <label className="font-semibold text-lg">Incharge</label>
                  <MenuIconAndDropDown
                    setSelected={(value) => {
                      setInCharge(value);
                      const event: any = {
                        target: {
                          name: "incharge",
                          value: value,
                        },
                      };
                      handleChange(event);
                    }}
                    DataArr={volunteersArr}
                    position="down"
                    errors={errors}
                    title={"incharge"}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label className="font-semibold text-lg">Coordinator</label>
                  <MenuIconAndDropDown
                    setSelected={(value) => {
                      setCoordinator(value);
                      const event: any = {
                        target: {
                          name: "coordinator",
                          value: value,
                        },
                      };
                      handleChange(event);
                    }}
                    DataArr={volunteersArr}
                    position="down"
                    errors={errors}
                    title={"coordinator"}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label className="font-semibold text-lg">Preacher</label>
                  <MenuIconAndDropDown
                    setSelected={(value) => {
                      setPreacher(value);
                      const event: any = {
                        target: {
                          name: "preacher",
                          value: value,
                        },
                      };
                      handleChange(event);
                    }}
                    DataArr={volunteersArr}
                    position="up"
                    errors={errors}
                    title={"preacher"}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label className="font-semibold text-lg">Mentor</label>
                  <MenuIconAndDropDown
                    setSelected={(value) => {
                      setMentor(value);
                      const event: any = {
                        target: {
                          name: "mentor",
                          value: value,
                        },
                      };
                      handleChange(event);
                    }}
                    DataArr={volunteersArr}
                    position="up"
                    errors={errors}
                    title={"mentor"}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label className="font-semibold text-lg">Audience Type</label>
                  <MenuOthersDropDown
                    setSelected={(value) => {
                      setAudienceType(value);
                      const event: any = {
                        target: {
                          name: "audienceType",
                          value: value,
                        },
                      };
                      handleChange(event);
                    }}
                    DataArr={AudienceTypes}
                    position="up"
                    errors={errors}
                    title={"audienceType"}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label className="font-semibold text-lg">Program Type</label>
                  <MenuOthersDropDown
                    setSelected={(value) => {
                      setProgramtype(value);
                      const event: any = {
                        target: {
                          name: "programType",
                          value: value,
                        },
                      };
                      handleChange(event);
                    }}
                    DataArr={ProgramType}
                    position="up"
                    errors={errors}
                    title={"programType"}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label
                  className="font-semibold text-lg"
                  htmlFor="Program_Location"
                  id="location"
                >
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formState.location}
                  onChange={handleChange}
                  className={`rounded-xl px-4 py-2 text-lg border transition-all duration-500 ${
                    state.theme.theme === "LIGHT"
                      ? `${
                          errors.location
                            ? "border-red-600 outline-none ring-4 ring-red-100 bg-white"
                            : "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-100 bg-white"
                        }`
                      : `${
                          errors.location
                            ? "border-red-500 outline-none ring-4 ring-red-950 bg-stone-900"
                            : "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-950 bg-stone-950 border-stone-800"
                        }`
                  }`}
                  id="Program_Location"
                  placeholder="Program Location"
                />

                {errors.location && (
                  <p className="text-red-500">This Field iS required</p>
                )}
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

interface PropsMenu<T> {
  setSelected: (state: T) => void;
  DataArr: T[];
  defaultVal?: string;
  position: string;
  errors?: any;
  title?: string;
}

function MenuIconAndDropDown<T>({
  setSelected,
  DataArr,
  defaultVal,
  position,
  errors,
  title,
}: PropsMenu<T>) {
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

  console.log(title);

  return (
    <div className="relative inline-block text-left w-full" ref={menuRef}>
      <button
        type="button"
        className={`flex items-center justify-between border px-2 py-2 rounded-xl gap-5 w-full focus:ring-4 outline-none focus:border font-semibold ${
          state.theme.theme === "LIGHT"
            ? `${
                errors.hasOwnProperty(title)
                  ? "bg-white border-red-500 ring-4 ring-red-100"
                  : "border-gray-300 bg-white focus:ring-blue-100 focus:border-blue-600"
              }`
            : `${
                errors.hasOwnProperty(title)
                  ? "bg-stone-950 border-red-500 ring-4 ring-red-950"
                  : "border-stone-700 bg-stone-950 focus:ring-blue-950 focus:border-blue-600"
              }`
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
                DataArr.length > 10
                  ? "md:h-[40vh] h-[40vh]"
                  : "h-[40vh] custom-scrollbar"
              }`}
              role="none"
            >
              {DataArr?.map((item: any, index: number) => (
                <li
                  key={index}
                  onClick={() => {
                    setSelectedOption(
                      item.initiatedName &&
                        item.initiatedName === "NA" &&
                        item.initiatedName === "Na" &&
                        item.initiatedName === "na" &&
                        item.initiatedName === "no" &&
                        item.initiatedName === "No" &&
                        item.initiatedName === "-"
                        ? item.initiatedName
                        : `${item.firstName} ${item.lastName}`
                    );
                    setSelected(item.id);
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
                  {item.initiatedName &&
                  item.initiatedName === "NA" &&
                  item.initiatedName === "Na" &&
                  item.initiatedName === "na" &&
                  item.initiatedName === "no" &&
                  item.initiatedName === "No" &&
                  item.initiatedName === "-"
                    ? item.initiatedName
                    : `${item.firstName} ${item.lastName}`}
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
function MenuOthersDropDown({
  setSelected,
  DataArr,
  defaultVal,
  position,
  errors,
  title,
}: {
  setSelected: (value: string) => void;
  DataArr: { name: string; value: string }[];
  defaultVal?: string;
  position?: string;
  errors: any;
  title?: string;
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
            ? `${
                errors.hasOwnProperty(title)
                  ? "bg-white border-red-500 ring-4 ring-red-100"
                  : "border-gray-300 bg-white focus:ring-blue-100 focus:border-blue-600"
              }`
            : `${
                errors.hasOwnProperty(title)
                  ? "bg-stone-950 border-red-500 ring-4 ring-red-950"
                  : "border-stone-700 bg-stone-950 focus:ring-blue-950 focus:border-blue-600"
              }`
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
                DataArr.length > 10
                  ? "md:h-[40vh] h-[60vh]"
                  : " h-[40vh] custom-scrollbar"
              }`}
              role="none"
            >
              {DataArr?.map(
                (item: { name: string; value: string }, index: number) => (
                  <li
                    key={index}
                    onClick={() => {
                      setSelectedOption(item.name);
                      setSelected(item.value);
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
                    {item.name}
                  </li>
                )
              )}
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

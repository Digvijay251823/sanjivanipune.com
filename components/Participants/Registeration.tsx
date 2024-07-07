"use client";
import { SERVER_ENDPOINT } from "@/ConfigFetch";
import LoadingComponent from "@/Utils/Icons/LoadingComponent";
import { useGlobalState } from "@/Utils/State";
import { POST } from "@/actions/POSTParticipants";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import React, {
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useFormState, useFormStatus } from "react-dom";
import { GenericErrorPage } from "./GenericErrorPage";
import { GenericSuccessPage } from "./GenericSuccessPage";

const initialState = {
  action: (formData: FormData, url: string) => Promise<{ message: any }>,
};

function Registeration() {
  const { state, dispatch } = useGlobalState();
  const [isOpenWarning, setIsOpenWarning] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const [formState, setFormState] = useState<any>({
    firstName: "",
    lastName: "",
    waNumber: "",
    age: 0,
    gender: "",
    contactNumber: "",
    city: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const phoneNumber = localStorage.getItem("PHONE");
    if (phoneNumber) {
      setFormState((prev: any) => ({
        ...prev, // Spread the previous state
        contactNumber: phoneNumber, // Update the contactNumber field
        waNumber: phoneNumber, // Update the waNumber field
      }));
    }
  }, []);

  const validateStep = () => {
    const requiredFields = [
      "firstName",
      "lastName",
      "waNumber",
      "age",
      "contactNumber",
      "gender",
      "city",
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

  const handleChange = (name: string, value: string) => {
    if (name === "contactNumber" && value.length !== 10) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "Contact number must be 10 digits",
      }));
    } else if (name === "waNumber" && value.length !== 10) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "whatsapp number must be 10 digits",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: undefined,
      }));
    }
    setFormState((prevFormState: any) => ({
      ...prevFormState,
      [name]: value,
    }));
  };

  async function handleSubmit(e: FormData) {
    const firstName = e.get("firstName")?.toString();
    const lastName = e.get("lastName")?.toString();
    const contactNumber = e.get("contactNumber")?.toString();
    const waNumber = e.get("waNumber")?.toString();
    const age = e.get("age")?.toString();
    const city = e.get("city")?.toString();
    validateStep();
    if (
      !firstName ||
      !lastName ||
      !contactNumber ||
      !waNumber ||
      !age ||
      !formState.gender ||
      !city
    ) {
      return;
    }
    const formData: any = {
      firstName,
      lastName,
      contactNumber,
      waNumber,
      gender: formState.gender,
      age,
      city,
    };
    try {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      const response = await fetch(`/api/participants/registration`, {
        method: "POST",
        headers,
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const responseData = await response.json();
        setFormState({
          firstName: "",
          lastName: "",
          contactNumber: "",
          waNumber: "",
          gender: "",
          age: "",
          city: "",
        });
        dispatch({
          type: "SHOW_TOAST",
          payload: { type: "SUCCESS", message: responseData.message },
        });

        router.back();
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
  }

  return (
    <div className="flex flex-col min-h-screen w-screen justify-center items-center">
      <div className="text-center py-10">
        <h1 className="text-4xl font-bold py-2">Registration</h1>
        <p>Looks Like You Are Not Registered Pleas Register</p>
      </div>
      <div
        className={`md:p-5 rounded-[40px] p-4 mb-6 ${
          state.theme.theme === "LIGHT"
            ? "bg-gray-50"
            : "bg-stone-900 bg-opacity-30"
        }`}
      >
        <form action={handleSubmit} className="md:w-[500px] w-[87vw]">
          <FirstStep
            changeHandler={handleChange}
            changedValue={formState}
            error={errors}
          />
        </form>
      </div>
    </div>
  );
}

export default Registeration;

const FirstStep = ({
  changeHandler,
  changedValue,
  error,
}: {
  changeHandler: (name: string, value: string) => void;
  changedValue: any;
  error: any;
}) => {
  const { state } = useGlobalState();
  const [Errorr, setErrorr] = useState<{ type: string; message: string } | any>(
    {}
  );

  return (
    <>
      <div className="flex flex-col gap-5 md:w-full ">
        <div className="flex md:flex-row flex-col gap-5 w-full">
          <div className="flex flex-col gap-3 w-full">
            <label htmlFor="firstName" className="font-bold text-lg">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              onChange={(e) => changeHandler(e.target.name, e.target.value)}
              value={changedValue.firstName}
              className={`border px-5 py-2.5 text-lg focus:ring-4 outline-none rounded-xl transition-all duration-500 w-full ${
                state.theme.theme === "LIGHT"
                  ? `border-gray-300 focus:ring-blue-100 focus:border-blue-600`
                  : `border-stone-900 focus:ring-blue-950 focus:border-blue-600 bg-stone-950`
              }`}
              id="firstName"
              placeholder="John"
            />
            {error.firstName && (
              <p className="text-red-500 text-sm mt-1">{error.firstName}</p>
            )}
          </div>
          <div className="flex flex-col gap-3 w-full">
            <label htmlFor="lastName" className="font-bold text-lg">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              onChange={(e) => changeHandler(e.target.name, e.target.value)}
              value={changedValue.lastName}
              className={`border px-5 py-2.5 text-lg focus:ring-4 outline-none rounded-xl transition-all duration-500 w-full ${
                state.theme.theme === "LIGHT"
                  ? `border-gray-300 focus:ring-blue-100 focus:border-blue-600`
                  : `border-stone-900 focus:ring-blue-950 focus:border-blue-600 bg-stone-950`
              }`}
              id="lastName"
              placeholder="Doe"
            />
            {error.lastName && (
              <p className="text-red-500 text-sm mt-1">{error.lastName}</p>
            )}
          </div>
        </div>
        <div className="flex md:flex-row flex-col gap-5 w-full">
          <div className="flex flex-col gap-3 w-full">
            <label htmlFor="waNumber" className="font-bold text-lg">
              Whatsapp Number
            </label>
            <input
              type="tel"
              name="waNumber"
              onChange={(e) => {
                if (isNaN(Number(e.target.value))) {
                  setErrorr({
                    type: "waNumber",
                    message: "invalid type of whatsappNumber",
                  });
                  return;
                }
                setErrorr({
                  type: "",
                  message: "",
                });
                changeHandler(e.target.name, e.target.value);
              }}
              value={changedValue.waNumber}
              className={`border px-5 py-2.5 text-lg focus:ring-4 outline-none rounded-xl transition-all duration-500 w-full ${
                state.theme.theme === "LIGHT"
                  ? `border-gray-300 focus:ring-blue-100 focus:border-blue-600`
                  : `border-stone-900 focus:ring-blue-950 focus:border-blue-600 bg-stone-950`
              }`}
              id="waNumber"
              placeholder="7379565771"
            />
            {error.waNumber && (
              <p className="text-red-500 text-sm mt-1">{error.waNumber}</p>
            )}
            {Errorr.type === "waNumber" && (
              <p className="text-red-500 text-sm mt-1">{Errorr.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-3 w-full">
            <label htmlFor="contactNumber" className="font-bold text-lg">
              Contact Number
            </label>
            <input
              type="tel"
              name="contactNumber"
              onChange={(e) => {
                if (isNaN(Number(e.target.value))) {
                  setErrorr({
                    type: "contactNumber",
                    message: "invalid type of contactNumber",
                  });
                  return;
                }
                setErrorr({
                  type: "",
                  message: "",
                });
                changeHandler(e.target.name, e.target.value);
              }}
              value={changedValue.contactNumber}
              className={`border px-5 py-2.5 text-lg focus:ring-4 outline-none rounded-xl transition-all duration-500 w-full ${
                state.theme.theme === "LIGHT"
                  ? `border-gray-300 focus:ring-blue-100 focus:border-blue-600`
                  : `border-stone-900 focus:ring-blue-950 focus:border-blue-600 bg-stone-950`
              }`}
              id="contactNumber"
              placeholder="7379565779"
            />
            {error.contactNumber && (
              <p className="text-red-500 text-sm mt-1">{error.contactNumber}</p>
            )}
            {Errorr.type === "contactNumber" && (
              <p className="text-red-500 text-sm mt-1">{Errorr.message}</p>
            )}
          </div>
        </div>
        <div className="flex md:flex-row flex-col gap-5 w-full">
          <div className="flex flex-col gap-3 w-full">
            <label htmlFor="gender" className="font-bold text-lg">
              Gender
            </label>
            <MenuToggleComponent
              DataArr={["MALE", "FEMALE"]}
              setSelected={(value: string) => changeHandler("gender", value)}
            />
            {error.gender && (
              <p className="text-red-500 text-sm mt-1">{error.gender}</p>
            )}
          </div>
          <div className="flex flex-col gap-3 w-full">
            <label htmlFor="age" className="font-bold text-lg">
              Age
            </label>
            <input
              type="number"
              name="age"
              onChange={(e) => changeHandler(e.target.name, e.target.value)}
              value={changedValue.age}
              className={`border px-5 py-2.5 text-lg focus:ring-4 outline-none rounded-xl transition-all duration-500 w-full ${
                state.theme.theme === "LIGHT"
                  ? `border-gray-300 focus:ring-blue-100 focus:border-blue-600`
                  : `border-stone-900 focus:ring-blue-950 focus:border-blue-600 bg-stone-950`
              }`}
              id="age"
              placeholder="enter your age"
            />
            {error.age && (
              <p className="text-red-500 text-sm mt-1">{error.age}</p>
            )}
          </div>
          <div className="flex flex-col gap-3 w-full">
            <label htmlFor="city" className="font-bold text-lg">
              Where Do You Live In Pune?
            </label>
            <input
              type="text"
              name="city"
              onChange={(e) => changeHandler(e.target.name, e.target.value)}
              value={changedValue.city}
              className={`border px-5 py-2.5 text-lg focus:ring-4 outline-none rounded-xl transition-all duration-500 w-full ${
                state.theme.theme === "LIGHT"
                  ? `border-gray-300 focus:ring-blue-100 focus:border-blue-600`
                  : `border-stone-900 focus:ring-blue-950 focus:border-blue-600 bg-stone-950`
              }`}
              id="city"
              placeholder="Pune"
            />
            {error.city && (
              <p className="text-red-500 text-sm mt-1">{error.city}</p>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-5 mt-14 w-full">
        <SubmitHandlerButton />
        {/* <div className="flex items-center gap-5">
          <p
            className={`border ${
              state.theme.theme === "LIGHT"
                ? "border-gray-300 w-[150px]"
                : "border-stone-700 w-[150px]"
            }`}
          ></p>
          <p className="font-semibold">OR</p>
          <p
            className={`border ${
              state.theme.theme === "LIGHT"
                ? "border-gray-300 w-[150px]"
                : "border-stone-700 w-[150px]"
            }`}
          ></p>
        </div>
        <div className="w-full flex flex-col items-center">
          <p className="text-lg mb-3">
            click on continue to fill more information
          </p>
          <button
            onClick={nextStep}
            type="button"
            className={`max-w-[300px] w-full px-4 py-2 text-xl font-bold rounded-xl flex items-center justify-center ${
              state.theme.theme === "LIGHT"
                ? "bg-black text-white"
                : "text-black bg-white"
            }`}
          >
            Continue
            <ArrowRightIcon className="w-5 h-5" />
          </button>
        </div> */}
      </div>
    </>
  );
};

// function SecondStep({
//   nextStep,
//   prevStep,
//   changeHandler,
//   changedValue,
// }: {
//   nextStep: () => void;
//   prevStep: () => void;
//   changeHandler: (name: string, value: string) => void;
//   changedValue: any;
// }) {
//   const { state } = useGlobalState();
//   return (
//     <>
//       <div className="flex flex-col gap-5 md:w-full w-[85vw]">
//         <div className="flex md:flex-row flex-col gap-5 w-full">
//           <div className="flex flex-col gap-3 w-full">
//             <label htmlFor="email" className="font-bold text-lg">
//               Email
//             </label>
//             <input
//               type="email"
//               name="email"
//               onChange={(e) => changeHandler(e.target.name, e.target.value)}
//               value={changedValue.email}
//               className={`border px-5 py-2.5 text-lg focus:ring-4 outline-none rounded-xl transition-all duration-500 w-full ${
//                 state.theme.theme === "LIGHT"
//                   ? `border-gray-300 focus:ring-blue-100 focus:border-blue-600`
//                   : `border-stone-900 focus:ring-blue-950 focus:border-blue-600 bg-stone-950`
//               }`}
//               id="email"
//               placeholder="johndoe@gmail.com"
//             />
//           </div>
//         </div>
//         <div className="flex md:flex-row flex-col gap-5 w-full">
//           <div className="flex flex-col gap-3 w-full">
//             <label htmlFor="education" className="font-bold text-lg">
//               Education
//             </label>
//             <input
//               type="text"
//               name="education"
//               onChange={(e) => changeHandler(e.target.name, e.target.value)}
//               value={changedValue.education}
//               className={`border px-5 py-2.5 text-lg focus:ring-4 outline-none rounded-xl transition-all duration-500 w-full ${
//                 state.theme.theme === "LIGHT"
//                   ? `border-gray-300 focus:ring-blue-100 focus:border-blue-600`
//                   : `border-stone-900 focus:ring-blue-950 focus:border-blue-600 bg-stone-950`
//               }`}
//               id="education"
//               placeholder="Graduate"
//             />
//           </div>
//           <div className="flex flex-col gap-3 w-full">
//             <label htmlFor="occupation" className="font-bold text-lg">
//               Occupation
//             </label>
//             <input
//               type="text"
//               name="occupation"
//               onChange={(e) => changeHandler(e.target.name, e.target.value)}
//               value={changedValue.occupation}
//               className={`border px-5 py-2.5 text-lg focus:ring-4 outline-none rounded-xl transition-all duration-500 w-full ${
//                 state.theme.theme === "LIGHT"
//                   ? `border-gray-300 focus:ring-blue-100 focus:border-blue-600`
//                   : `border-stone-900 focus:ring-blue-950 focus:border-blue-600 bg-stone-950`
//               }`}
//               id="occupation"
//               placeholder="Doctor"
//             />
//           </div>
//           <div className="flex flex-col gap-3 w-full">
//             <label htmlFor="maritalStatus" className="font-bold text-lg">
//               Marital Status
//             </label>
//             <MenuToggleComponent
//               DataArr={["UNMARRIED", "MARRIED"]}
//               setSelected={(value: string) =>
//                 changeHandler("maritalStatus", value)
//               }
//             />
//           </div>
//         </div>
//         <div className="flex md:flex-row flex-col gap-5 w-full">
//           <div className="flex flex-col gap-3 w-full">
//             <label htmlFor="address" className="font-bold text-lg">
//               location
//             </label>
//             <input
//               type="text"
//               name="address"
//               onChange={(e) => changeHandler(e.target.name, e.target.value)}
//               value={changedValue.address}
//               className={`border px-5 py-2.5 text-lg focus:ring-4 outline-none rounded-xl transition-all duration-500 w-full ${
//                 state.theme.theme === "LIGHT"
//                   ? `border-gray-300 focus:ring-blue-100 focus:border-blue-600`
//                   : `border-stone-900 focus:ring-blue-950 focus:border-blue-600 bg-stone-950`
//               }`}
//               id="address"
//               placeholder="Iskon NVCC"
//             />
//           </div>
//           <div className="flex flex-col gap-3 w-full">
//             <label htmlFor="city" className="font-bold text-lg">
//               City
//             </label>
//             <input
//               type="text"
//               name="city"
//               onChange={(e) => changeHandler(e.target.name, e.target.value)}
//               value={changedValue.city}
//               className={`border px-5 py-2.5 text-lg focus:ring-4 outline-none rounded-xl transition-all duration-500 w-full ${
//                 state.theme.theme === "LIGHT"
//                   ? `border-gray-300 focus:ring-blue-100 focus:border-blue-600`
//                   : `border-stone-900 focus:ring-blue-950 focus:border-blue-600 bg-stone-950`
//               }`}
//               id="city"
//               placeholder="Pune"
//             />
//           </div>
//         </div>
//       </div>
//       <div className="flex items-center justify-between gap-5 mt-14 w-full">
//         <button
//           onClick={prevStep}
//           type="button"
//           className={`max-w-[300px] md:w-full w-[150px] flex items-center justify-center gap-3 py-2 text-xl font-bold rounded-xl ${
//             state.theme.theme === "LIGHT"
//               ? "bg-black text-white"
//               : "text-black bg-white "
//           }`}
//         >
//           <ArrowLeftIcon className="h-5 w-5" />
//           Prev
//         </button>

//         <button
//           onClick={nextStep}
//           type="button"
//           className={`max-w-[300px] md:w-full w-[150px] px-4 py-2 text-xl font-bold rounded-xl flex items-center justify-center gap-3 ${
//             state.theme.theme === "LIGHT"
//               ? "bg-black text-white"
//               : "text-black bg-white"
//           }`}
//         >
//           Continue
//           <ArrowRightIcon className="w-5 h-5" />
//         </button>
//       </div>
//     </>
//   );
// }

// const ThirdStep = ({
//   prevStep,
//   changeHandler,
//   changedValue,
// }: {
//   prevStep: () => void;
//   changeHandler: (name: string, value: string) => void;
//   changedValue: any;
// }) => {
//   const { state } = useGlobalState();
//   return (
//     <>
//       <div className="flex flex-col gap-5 w-full">
//         <div className="flex md:flex-row flex-col gap-5 w-full">
//           <div className="flex flex-col gap-3 w-full">
//             <label htmlFor="reference" className="font-bold text-lg">
//               Reference
//             </label>
//             <input
//               type="text"
//               name="reference"
//               onChange={(e) => changeHandler(e.target.name, e.target.value)}
//               value={changedValue.reference}
//               className={`border px-5 py-2.5 text-lg focus:ring-4 outline-none rounded-xl transition-all duration-500 w-full ${
//                 state.theme.theme === "LIGHT"
//                   ? `border-gray-300 focus:ring-blue-100 focus:border-blue-600`
//                   : `border-stone-900 focus:ring-blue-950 focus:border-blue-600 bg-stone-950`
//               }`}
//               id="reference"
//               placeholder="friends/collegue/etc."
//             />
//           </div>
//           <div className="flex flex-col gap-3 w-full">
//             <label htmlFor="numberOfChildren" className="font-bold text-lg">
//               Number Of Children
//             </label>
//             <input
//               type="number"
//               name="numberOfChildren"
//               onChange={(e) => changeHandler(e.target.name, e.target.value)}
//               value={changedValue.numberOfChildren}
//               className={`border px-5 py-2.5 text-lg focus:ring-4 outline-none rounded-xl transition-all duration-500 w-full ${
//                 state.theme.theme === "LIGHT"
//                   ? `border-gray-300 focus:ring-blue-100 focus:border-blue-600`
//                   : `border-stone-900 focus:ring-blue-950 focus:border-blue-600 bg-stone-950`
//               }`}
//               id="numberOfChildren"
//               placeholder="0"
//             />
//           </div>
//         </div>
//         <div className="flex flex-col gap-3 w-full">
//           <label htmlFor="notes" className="font-bold text-lg">
//             Notes
//           </label>
//           <input
//             type="text"
//             name="notes"
//             onChange={(e) => changeHandler(e.target.name, e.target.value)}
//             value={changedValue.notes}
//             className={`border px-5 py-2.5 text-lg focus:ring-4 outline-none rounded-xl transition-all duration-500 w-full ${
//               state.theme.theme === "LIGHT"
//                 ? `border-gray-300 focus:ring-blue-100 focus:border-blue-600`
//                 : `border-stone-900 focus:ring-blue-950 focus:border-blue-600 bg-stone-950`
//             }`}
//             id="notes"
//             placeholder="write something"
//           />
//         </div>
//       </div>
//       <div className="flex flex-col items-center gap-5 mt-14 w-full">
//         <SubmitHandlerButton />
//         <div className="flex items-center gap-5">
//           <p
//             className={`border ${
//               state.theme.theme === "LIGHT"
//                 ? "border-gray-300 w-[150px]"
//                 : "border-stone-700 w-[150px]"
//             }`}
//           ></p>
//           <p className="font-semibold">OR</p>
//           <p
//             className={`border ${
//               state.theme.theme === "LIGHT"
//                 ? "border-gray-300 w-[150px]"
//                 : "border-stone-700 w-[150px]"
//             }`}
//           ></p>
//         </div>

//         <button
//           onClick={prevStep}
//           type="button"
//           className={`max-w-[300px] w-full px-4 py-2 text-xl font-bold rounded-xl flex items-center justify-center gap-3 ${
//             state.theme.theme === "LIGHT"
//               ? "bg-black text-white"
//               : "text-black bg-white"
//           }`}
//         >
//           <ArrowLeftIcon className="w-5 h-5" />
//           Prev
//         </button>
//       </div>
//     </>
//   );
// };

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
          Signup & Register
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
    <div className="relative inline-block text-left w-full" ref={menuRef}>
      <button
        type="button"
        className={`flex items-center justify-between border px-2 py-3 rounded-xl gap-5 w-full focus:ring-4 outline-none focus:border font-semibold ${
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

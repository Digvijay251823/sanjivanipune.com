"use client";
import React, { ChangeEvent, useEffect, useState } from "react";

import {
  NOR as NORComponent,
  F8RCT as F8RCTComponent,
  N8RCT as N8RCTComponent,
  WUT as WUTComponent,
  ST as STComponent,
  PBR as PBRComponent,
  BNR as BNRComponent,
  PCH as PCHComponent,
  GCH as GCHComponent,
  CH as CHComponent,
  S as SComponent,
  AA as AAComponent,
  T as TComponent,
  VS as VSComponent,
  MIU as MIUComponent,
  FormListItems,
} from "@/components/Modules/Information/programs/sadhana/ConfigSadhanaForm";
import { useGlobalState } from "@/Utils/State";
import { usePathname, useRouter } from "next/navigation";
import { ChevronLeftIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { POSTADMIN } from "@/actions/POSTRequests";
import { SERVER_ENDPOINT } from "@/ConfigFetch";

function ConfigureSadhana({
  response,
  sadhanaResponse,
}: {
  response?: any;
  sadhanaResponse?: any;
}) {
  const pathname = usePathname();
  const { state, dispatch } = useGlobalState();
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const router = useRouter();
  const [attendedArthi, setAttendedArthi] = useState<
    | {
        target: { name: any; value: any };
      }
    | any
  >({});
  const [visibleSadhana, setvisibleSadhana] = useState<
    | {
        target: { name: any; value: any };
      }
    | any
  >({});
  const [checkedItems, setCheckedItems] = useState<
    {
      id: number;
      type: string;
      valueType: string;
      functionName: string;
      databaseField: string;
    }[]
  >([]);

  const [checkedItemsObj, setCheckedItemsObj] = useState<any>({
    programId: response?.id,
    numberOfRounds: false,
    first8RoundsCompletedTime: false,
    next8RoundsCompletedTime: false,
    wakeUpTime: false,
    sleepTime: false,
    prabhupadaBookReading: false,
    nonPrabhupadaBookReading: false,
    prabhupadaClassHearing: false,
    guruClassHearing: false,
    otherClassHearing: false,
    speaker: false,
    attendedArti: false,
    mobileInternetUsage: false,
    topic: false,
    visibleSadhana: false,
  });
  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
    item: {
      id: number;
      type: string;
      valueType: string;
      functionName: string;
      databaseField: string;
    }
  ) => {
    const { checked } = event.target;
    if (checked) {
      setCheckedItems((prevItems) => [...prevItems, item]);
    } else {
      setCheckedItems((prevItems) =>
        prevItems.filter((prevItem) => prevItem.id !== item.id)
      );
      setCheckedItemsObj((prevState: any) => ({
        ...prevState,
        [item.databaseField]: checked, // Set to the checkbox status
      }));
    }
  };

  useEffect(() => {
    if (sadhanaResponse) {
      const filteredArrForChecked = FormListItems.filter(
        (item) => sadhanaResponse[item.databaseField] === true
      );
      setCheckedItems(filteredArrForChecked);
    }
  }, [sadhanaResponse]);

  useEffect(() => {
    setCheckedItemsObj((prevState: any) => {
      const newState = { ...prevState };
      checkedItems.forEach((key) => {
        if (newState.hasOwnProperty(key.databaseField)) {
          newState[key.databaseField] = true;
        } else {
          console.log(newState[key.databaseField]);
        }
      });
      return newState;
    });
  }, [checkedItems]);

  async function handleSubmit() {
    if (Object.keys(checkedItemsObj).length <= 1) {
      dispatch({
        type: "SHOW_TOAST",
        payload: { type: "ERROR", message: "you haven't selected any field" },
      });
      return;
    }
    if (response.sadhanaForm > 0) {
      checkedItemsObj.id = response.sadhanaForm;
      console.log(checkedItemsObj);
      try {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        const response = await fetch(`/api/admin/information/sadhana/update`, {
          method: "POST",
          headers,
          body: JSON.stringify(checkedItemsObj),
        });
        if (response.ok) {
          const responseData = await response.json();
          dispatch({
            type: "SHOW_TOAST",
            payload: { type: "SUCCESS", message: responseData.message },
          });
        } else {
          const responseError = await response.json();
          dispatch({
            type: "SHOW_TOAST",
            payload: {
              type: "ERROR",
              message:
                responseError.message ||
                responseError.title ||
                "unexpectec error occured while creating sadhana form",
            },
          });
        }
      } catch (error: any) {
        dispatch({
          type: "SHOW_TOAST",
          payload: { type: "ERROR", message: error.message },
        });
      } finally {
        router.back();
      }
    } else {
      try {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        const response = await fetch(
          `/api/admin/information/sadhana/generate`,
          {
            method: "POST",
            headers,
            body: JSON.stringify(checkedItemsObj),
          }
        );
        if (response.ok) {
          const responseData = await response.json();
          dispatch({
            type: "SHOW_TOAST",
            payload: { type: "SUCCESS", message: responseData.message },
          });
        } else {
          const responseError = await response.json();
          dispatch({
            type: "SHOW_TOAST",
            payload: {
              type: "ERROR",
              message:
                responseError.message ||
                responseError.title ||
                "unexpectec error occured while creating sadhana form",
            },
          });
        }
      } catch (error: any) {
        dispatch({
          type: "SHOW_TOAST",
          payload: { type: "ERROR", message: error.message },
        });
      } finally {
        router.back();
      }
    }
  }

  return (
    <div className="h-screen w-screen overflow-y-auto fixed top-0 bottom-0 right-0 left-0 z-[1000]">
      <div
        className={`fixed z-[1000] md:w-[50vw] w-full left-0 top-0 bottom-0 h-screen overflow-y-auto custom-scrollbar ${
          state.theme.theme === "LIGHT" ? "backdrop-blur-2xl" : "bg-stone-900"
        }`}
      >
        <button
          className={`absolute z-[100] right-0 top-0 flex items-center justify-between text-lg text-blue-600 font-bold m-3 ml-6 px-5 py-2 rounded-lg ${
            state.theme.theme === "LIGHT"
              ? "bg-blue-100"
              : " bg-blue-900 bg-opacity-40"
          }`}
          onClick={() => router.back()}
        >
          <ChevronLeftIcon className="h-6 w-6" />
          back
        </button>
        <div className="px-5 py-5">
          <p className=" text-xl font-bold ">Configure Form</p>
          <p className="text-gray-500">
            select some fields below to customize the sadhana form
          </p>
        </div>
        <div className="flex flex-col gap-2 ">
          {FormListItems?.map((item, index) => (
            <div key={index} className="mx-10 flex items-center gap-2">
              <input
                type="checkbox"
                name="checkbox"
                id={item.type}
                className="w-5 h-5 "
                checked={checkedItems.some(
                  (checkedItem) => checkedItem.id === item.id
                )}
                onChange={(e) => handleChange(e, item)}
              />
              <label htmlFor={item.type} className="font-bold text-lg">
                {item.type}
              </label>
            </div>
          ))}
        </div>
        <button
          onClick={handleSubmit}
          className={`flex items-center justify-between text-lg text-blue-600 font-bold m-3 ml-6 px-5 py-2 rounded-lg ${
            state.theme.theme === "LIGHT"
              ? "bg-blue-100"
              : " bg-blue-900 bg-opacity-40"
          }`}
        >
          Generate Form
        </button>
      </div>
      <div className="pt-20 w-[45vw] ml-auto ">
        <div
          className={`px-5 rounded-[40px] drop-shadow-lg  ml-auto mx-10 ${
            state.theme.theme === "LIGHT"
              ? "bg-white border-gray-300"
              : "border-stone-700 bg-stone-900"
          }`}
        >
          <p className="text-center font-semibold text-gray-400">
            Preview Form
          </p>
          <h1 className="text-center font-bold text-xl py-8">Sadhana Form</h1>
          <div className="flex flex-col gap-2 w-full">
            <div className="flex flex-col gap-2 w-full">
              <label className="font-semibold ">PHONE NUMBER</label>
              <input
                type="tel"
                disabled={true}
                className={`rounded-xl px-4 py-2.5 text-lg border transition-all duration-500 ${
                  state.theme.theme === "LIGHT"
                    ? "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-100 bg-white"
                    : "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-950 bg-stone-950 border-stone-800"
                }`}
                placeholder="8888959287"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <button
              className={`px-4 py-2 text-lg rounded-xl my-5 w-full font-bold ${
                state.theme.theme === "LIGHT"
                  ? "bg-blue-200 text-blue-600"
                  : "bg-blue-900 bg-opacity-40 text-blue-600"
              } `}
              type="submit"
              disabled
            >
              {isLoading ? "loading..." : "Search"}
            </button>
          </div>
          <p className="text-center p-5 text-gray-400">
            This form is to track your daily progress in the path of
            <i className="text-red-400 ml-2">Krsna consiousness</i>
          </p>
          <div className="flex flex-col gap-5">
            {checkedItems.map((item, index) => {
              switch (item.functionName) {
                case "NOR":
                  return (
                    <NORComponent key={index} label={"Number of Rounds "} />
                  );
                // case "EJRB8A":
                //   return (
                //     <EJRB8AComponent
                //       key={index}
                //       label={"Early Japa rounds before 8 AM "}
                //     />
                //   );
                // case "AJRA8A":
                //   return (
                //     <AJRA8AComponent
                //       key={index}
                //       label={"Early Japa rounds after 8 AM "}
                //     />
                //   );
                case "F8RCT":
                  return (
                    <F8RCTComponent
                      key={index}
                      label={"First 8 rounds completed time "}
                    />
                  );
                case "N8RCT":
                  return (
                    <N8RCTComponent
                      key={index}
                      label={"Next 8 rounds completed time "}
                    />
                  );
                case "WUT":
                  return <WUTComponent key={index} label={"Wake up time "} />;
                case "ST":
                  return <STComponent key={index} label={"Sleep time "} />;
                case "PBR":
                  return (
                    <PBRComponent
                      key={index}
                      label={"Prabhupada Book Reading Time(in minutes)"}
                    />
                  );
                case "BNR":
                  return (
                    <BNRComponent key={index} label={"Book Name Reading"} />
                  );
                case "PCH":
                  return (
                    <PCHComponent
                      key={index}
                      label={"Prabhupada Class Hearing Time(in minutes)"}
                    />
                  );
                case "GCH":
                  return (
                    <GCHComponent
                      key={index}
                      label={"Guru Maharaj Class Hearing Time(in minutes)"}
                    />
                  );
                case "CH":
                  return (
                    <CHComponent
                      key={index}
                      label={"Class Hearing Time(in minutes)"}
                    />
                  );
                case "S":
                  return <SComponent key={index} label={"Speaker Name"} />;
                case "AA":
                  return (
                    <AAComponent
                      key={index}
                      label={"Attended Arthi"}
                      onChange={(value: {
                        target: { name: any; value: any };
                      }) => setAttendedArthi(value)}
                    />
                  );
                case "T":
                  return <TComponent key={index} label={"Topic"} />;
                case "VS":
                  return (
                    <VSComponent
                      key={index}
                      label={"Visible Sadhana"}
                      onChange={(value: {
                        target: { name: any; value: any };
                      }) => setvisibleSadhana(value)}
                    />
                  );
                case "MIU":
                  return (
                    <MIUComponent key={index} label={"Mobile/Internet-Usage"} />
                  );
                // Add more cases as needed
                default:
                  return null;
              }
            })}
          </div>
          {checkedItems?.length > 0 ? (
            <div className="flex justify-center w-full ">
              <button
                disabled={pathname !== `/sadhana`}
                className={`px-4 py-2 text-lg rounded-xl my-5 w-full font-bold ${
                  state.theme.theme === "LIGHT"
                    ? "bg-blue-200 text-blue-600"
                    : "bg-blue-900 bg-opacity-40 text-blue-600"
                } `}
                type="submit"
              >
                Submit
              </button>
            </div>
          ) : (
            <div className="text-center font-semibold my-10 text-gray-400">
              No Configured Fields
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ConfigureSadhana;
/** */

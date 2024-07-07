import React, { useEffect } from "react";
import { useGlobalState } from "./State";
import LoadingComponent from "./Icons/LoadingComponent";
import {
  CheckCircleIcon,
  CheckIcon,
  ExclamationCircleIcon,
  XMarkIcon,
} from "@heroicons/react/16/solid";
import Modal from "./Modal";

function Toast() {
  const { state, dispatch } = useGlobalState();
  // useEffect(() => {
  //   if (state.toast.toast.isVisible) {
  //     setTimeout(() => {
  //       dispatch({ type: "HIDE_TOAST" });
  //     }, 3000);
  //   }
  // }, [state.toast.toast.isVisible, dispatch]);

  return (
    <div className={`fixed z-[10000]`}>
      {state.toast.toast.type === "LOADING" ? (
        <Modal
          isOpen={state.toast.toast.isVisible}
          onClose={() => dispatch({ type: "HIDE_TOAST" })}
        >
          <div
            className={`md:w-[500px] w-[90vw] py-10 rounded-[40px] ${
              state.theme.theme === "LIGHT"
                ? "bg-white shadow-xl"
                : "bg-stone-900 shadow-xl shadow-stone-950"
            }`}
          >
            <div className="flex flex-col items-center gap-5 pb-10">
              <p className="text-center">
                <LoadingComponent />
              </p>
              <p className="font-bold text-2xl">{state.toast.toast.message}</p>
            </div>
          </div>
        </Modal>
      ) : state.toast.toast.type === "SUCCESS" ? (
        <Modal
          isOpen={state.toast.toast.isVisible}
          onClose={() => dispatch({ type: "HIDE_TOAST" })}
        >
          <div
            className={`md:w-[500px] w-[90vw] py-10 rounded-[40px] ${
              state.theme.theme === "LIGHT"
                ? "bg-white shadow-xl"
                : "bg-stone-900 shadow-xl shadow-stone-950"
            }`}
          >
            <div className="flex flex-col items-center gap-5 pb-10">
              <p className="text-center">
                <CheckCircleIcon className="h-20 w-20 text-green-600" />
              </p>
              <p className="font-bold text-2xl">{state.toast.toast.message}</p>
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => dispatch({ type: "HIDE_TOAST" })}
                className={`w-[200px] py-2 rounded-lg font-semibold text-lg focus:ring-4 ${
                  state.theme.theme === "LIGHT"
                    ? "bg-blue-700 text-white ring-blue-100"
                    : " bg-blue-700 text-white ring-blue-300"
                }`}
              >
                Ok
              </button>
            </div>
          </div>
        </Modal>
      ) : (
        <Modal
          isOpen={state.toast.toast.isVisible}
          onClose={() => dispatch({ type: "HIDE_TOAST" })}
        >
          <div
            className={`md:w-[500px] w-[90vw] py-10 rounded-[40px] ${
              state.theme.theme === "LIGHT"
                ? "bg-white shadow-xl"
                : "bg-stone-900 shadow-xl shadow-stone-950"
            }`}
          >
            <div className="flex flex-col items-center gap-5 pb-10">
              <p className="text-center">
                <ExclamationCircleIcon className="h-20 w-20" />
              </p>
              <p className="font-bold text-2xl">{state.toast.toast.message}</p>
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => dispatch({ type: "HIDE_TOAST" })}
                className={`w-[200px] py-2 rounded-lg font-semibold text-lg focus:ring-4 ${
                  state.theme.theme === "LIGHT"
                    ? "bg-blue-700 text-white ring-blue-100"
                    : " bg-blue-700 text-white ring-blue-300"
                }`}
              >
                Ok
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default Toast;

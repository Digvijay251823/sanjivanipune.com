"use client";
import useWindowDimensions from "@/Utils/Hooks/WindowDimentions";
import ToggleController from "@/Utils/Icons/ToggleController";
import { useGlobalState } from "@/Utils/State";
import { MoonIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function SettingsAndCustomizations() {
  const { state, dispatch } = useGlobalState();
  const { width } = useWindowDimensions();

  return (
    <div className="min-h-screen">
      <div className="flex flex-col items-center">
        <div className="w-full">
          <div
            className="p-5 md:mx-5 flex items-center justify-between"
            onClick={() => {
              if (state.theme.theme === "DARK") {
                localStorage.setItem("THEME", "LIGHT");
                dispatch({ type: "LIGHT" });
              } else {
                localStorage.setItem("THEME", "DARK");
                dispatch({ type: "DARK" });
              }
            }}
          >
            <div className="flex items-center gap-3">
              <p
                className={`${
                  state.theme.theme === "LIGHT"
                    ? "bg-gradient-to-b from-slate-50 to-slate-100 w-max p-2 rounded-full"
                    : "bg-gradient-to-b from-slate-950 to-gray-900 w-max p-2 rounded-full"
                }`}
              >
                <MoonIcon className="h-6 w-6" />
              </p>
              <div>
                <p className="font-bold text-xl">Appearance Controll</p>
                <p className="text-lg text-gray-500">
                  Change the appearance theme to <i>light</i> or <i>dark</i>
                </p>
              </div>
            </div>
            <div>
              <ToggleController
                isOpen={state.theme.theme === "DARK"}
                onToggle={() => {
                  if (state.theme.theme === "DARK") {
                    dispatch({ type: "LIGHT" });
                  } else {
                    dispatch({ type: "DARK" });
                  }
                }}
              />
            </div>
          </div>
          <div className="p-5 flex items-center justify-between w-full">
            <div
              className={`p-5 md:mx-5 w-full rounded-3xl ${
                state.theme.theme === "LIGHT"
                  ? "bg-gray-50"
                  : "bg-stone-900 bg-opacity-30"
              } flex items-center justify-between`}
            >
              <p className="text-xl">Change Password</p>
              <Link href={"/auth/changepassword"}>
                <button className="bg-red-400 px-4 py-2 text-white">
                  Change Password
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsAndCustomizations;

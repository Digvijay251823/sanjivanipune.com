"use client";
import React, { useEffect } from "react";
import { GlobalStateProvider, useGlobalState } from "./State";
import Toast from "./Toast";
import { cookies } from "next/headers";
function GlobalStateManager({ children }: { children: React.ReactNode }) {
  return (
    <GlobalStateProvider>
      <ChildrenGlobalState>
        {children}
        <Toast />
      </ChildrenGlobalState>
    </GlobalStateProvider>
  );
}

export default GlobalStateManager;

function ChildrenGlobalState({ children }: { children: React.ReactNode }) {
  const { state, dispatch } = useGlobalState();

  useEffect(() => {
    const prefersDarkMode =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "DARK"
        : "LIGHT";
    const storedTheme = localStorage.getItem("THEME");
    const initialTheme = storedTheme || prefersDarkMode;

    localStorage.setItem("THEME", initialTheme);
    dispatch({ type: initialTheme });
  }, [dispatch]);
  return (
    <section
      className={
        state.theme.theme === "DARK"
          ? "bg-stone-950 text-white min-h-screen flex"
          : "bg-white text-black min-h-screen flex"
      }
    >
      {children}
    </section>
  );
}

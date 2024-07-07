"use client";
import LoadingComponent from "@/Utils/Icons/LoadingComponent";
import LogoMain from "@/Utils/Icons/LogoMain";
import { useGlobalState } from "@/Utils/State";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useFormStatus } from "react-dom";

function SignIn() {
  const { state, dispatch } = useGlobalState();
  const router = useRouter();
  async function handleAuthenticate(e: FormData) {
    const email = e.get("email")?.toString()?.toLowerCase();
    const password = e.get("password")?.toString();

    if (!email || !password) {
      dispatch({
        type: "SHOW_TOAST",
        payload: {
          type: "ERROR",
          message: "Please enter the credentials",
        },
      });
      return;
    }
    const formData: any = {
      email,
      password,
    };

    const header = new Headers();
    header.append("Content-Type", "application/json");
    try {
      const response = await fetch(`/api/auth/signin`, {
        method: "POST",
        headers: header,
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();
        dispatch({
          type: "SHOW_TOAST",
          payload: { type: "SUCCESS", message: responseData.message },
        });
        router.push("/admin/information/programs");
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
    <div className="w-full min-h-screen flex flex-col items-center mb-10">
      <div className="my-20 flex flex-col items text-5xl font-bold items-center">
        <LogoMain height={60} width={60} />
        Sign In
      </div>
      <div
        className={`${
          state.theme.theme === "LIGHT"
            ? "bg-gray-50"
            : "bg-stone-900 bg-opacity-20"
        } md:p-10 p-6 mt-5 rounded-[60px]`}
      >
        <form action={handleAuthenticate} className="md:w-[400px] w-[80vw]">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-5">
              <label htmlFor="email" className="font-semibold text-2xl">
                Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                className={`px-4 py-4 text-lg w-full rounded-2xl  focus:ring-4 outline-none border transition-all duration-500 ${
                  state.theme.theme === "LIGHT"
                    ? "focus:border-blue-600 bg-gray-100 focus:ring-blue-100 border-gray-200"
                    : "focus:border-blue-500 bg-stone-950 focus:ring-blue-950 border-stone-800 active:bg-stone-950"
                }`}
                placeholder="xyz@example.com"
              />
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="font-semibold text-2xl">
                  Password
                </label>
                <p
                  className={`font-semibold text-xl underline ${
                    state.theme.theme === "LIGHT"
                      ? "text-gray-500"
                      : "text-stone-500"
                  }`}
                >
                  <Link href={"/auth/forgetpassword"}>Forget Password</Link>
                </p>
              </div>
              <input
                type="text"
                id="password"
                name="password"
                className={`px-4 py-4 text-lg w-full rounded-2xl  focus:ring-4 outline-none border transition-all duration-500 ${
                  state.theme.theme === "LIGHT"
                    ? "focus:border-blue-600 bg-gray-100 focus:ring-blue-100 border-gray-200"
                    : "focus:border-blue-500 bg-stone-950 focus:ring-blue-950 border-stone-800"
                }`}
                placeholder="********"
              />
            </div>
          </div>
          <div className="flex justify-center w-full md:px-10 px-5 mt-10">
            <SubmitHandlerButton />
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;

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
          className={`font-semibold text-2xl py-2 rounded-xl ${
            state.theme.theme === "LIGHT"
              ? "bg-black text-white"
              : "bg-white text-black"
          } w-full `}
          disabled={pending}
        >
          Submit
        </button>
      )}
    </>
  );
}

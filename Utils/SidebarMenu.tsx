"use client";
import React, { useEffect, useState } from "react";
import { useGlobalState } from "./State";
import useWindowDimensions from "./Hooks/WindowDimentions";
import Link from "next/link";

import {
  ArrowTrendingUpIcon,
  AcademicCapIcon,
  ChevronDownIcon,
  CalendarDaysIcon,
  CircleStackIcon,
  Cog6ToothIcon,
  PresentationChartBarIcon,
  QueueListIcon,
  UserIcon,
  UserGroupIcon,
  SparklesIcon,
  Squares2X2Icon,
  RectangleGroupIcon,
} from "@heroicons/react/24/outline";
import { usePathname, useRouter } from "next/navigation";
import { LOGOUT } from "@/actions/POSTRequests";
import LogoMain from "./Icons/LogoMain";

function SidebarMenu({ authres }: any) {
  const router = useRouter();
  const { state, dispatch } = useGlobalState();
  const { width } = useWindowDimensions();
  const pathname = usePathname();
  const handleLogout = async () => {
    try {
      const response = await LOGOUT();
      dispatch({
        type: "SHOW_TOAST",
        payload: { type: "SUCCESS", message: response.message },
      });
      router.push("/auth/signin");
    } catch (error: any) {
      dispatch({
        type: "SHOW_TOAST",
        payload: { type: "ERROR", message: error.message },
      });
    }
  };
  useEffect(() => {
    if (typeof authres === "undefined") {
      router.push("/auth/signin");
    }
  }, [authres, router]);
  return (
    <div
      className={`hidden md:block fixed w-[240px] z-[1000] ${
        state.theme.theme === "LIGHT"
          ? "h-screen border-r bg-white"
          : "h-screen border-r bg-stone-900 border-r-stone-900 bg-opacity-10"
      }`}
    >
      <div className="mt-1 text-lg font-bold text-center justify-center">
        <h1 className="text-xl font-bold flex flex-col items-center">
          <LogoMain height={45} width={60} />
          Sanjivani
        </h1>
      </div>
      <div className="flex flex-col text-lg mx-4 overflow-y-auto">
        <Link href={"/admin/dashboard"}>
          <div
            className={`flex items-center gap-3 py-2 my-1 px-1.5 rounded-2xl font-semibold ${
              pathname.startsWith("/admin/dashboard")
                ? `${
                    state.theme.theme === "LIGHT"
                      ? "bg-blue-50 text-blue-700"
                      : "bg-blue-950 text-blue-300 bg-opacity-40"
                  }`
                : `${
                    state.theme.theme === "LIGHT"
                      ? "hover:bg-blue-50 text-black"
                      : "hover:bg-blue-950 text-stone-300"
                  }`
            }`}
          >
            <Squares2X2Icon className="h-6 w-6" />
            Dashboard
          </div>
        </Link>
        <ToggleMenuOptions
          options={[
            {
              title: "Programs",
              LinkrouteName:
                "/admin/information/programs?sort=id&page=0&size=10",
              routeName: "/admin/information/programs",
              icon: <CalendarDaysIcon />,
            },
            {
              title: "Courses Master",
              LinkrouteName:
                "/admin/information/mcourses?sort=id&page=0&size=10",
              routeName: "/admin/information/mcourses",
              icon: <AcademicCapIcon />,
            },
            {
              title: "Activities",
              LinkrouteName:
                "/admin/information/activities?sort=id&page=0&size=10",
              routeName: "/admin/information/activities",
              icon: <PresentationChartBarIcon />,
            },
            {
              title: "Activity Master",
              LinkrouteName:
                "/admin/information/mactivities?sort=id&page=0&size=10",
              routeName: "/admin/information/mactivities",
              icon: <QueueListIcon />,
            },
            {
              title: "Course Levels",
              LinkrouteName: "/admin/information/levels?sort=id&page=0&size=10",
              routeName: "/admin/information/levels",
              icon: <ArrowTrendingUpIcon />,
            },
            {
              title: "Volunteers",
              LinkrouteName:
                "/admin/information/volunteers?sort=id&page=0&size=10",
              routeName: "/admin/information/volunteers",
              icon: <UserIcon />,
            },
            {
              title: "Participants",
              LinkrouteName:
                "/admin/information/participants?sort=id&page=0&size=10",
              routeName: "/admin/information/participants",
              icon: <UserGroupIcon />,
            },
            {
              title: "Sadhana",
              LinkrouteName:
                "/admin/information/sadhana?sort=id&page=0&size=10",
              routeName: "/admin/information/sadhana",
              icon: <SparklesIcon />,
            },
            {
              title: "Extra Courses",
              LinkrouteName:
                "/admin/information/extracourses?sort=id&page=0&size=10",
              routeName: "/admin/information/extracourses",
              icon: <RectangleGroupIcon />,
            },
          ]}
          title="Information"
          buttonStyles={`flex items-center py-2 my-1 px-1.5 rounded-2xl`}
        />
        <Link href={"/admin/customizations"}>
          <div
            className={`flex items-center gap-3 py-2 my-1 px-1.5 rounded-2xl font-semibold ${
              pathname.startsWith("/admin/customizations")
                ? `${
                    state.theme.theme === "LIGHT"
                      ? "bg-blue-50 text-blue-700"
                      : "bg-blue-950 text-blue-300 bg-opacity-40"
                  }`
                : `${
                    state.theme.theme === "LIGHT"
                      ? "hover:bg-blue-50 text-black"
                      : "hover:bg-blue-950 text-stone-300"
                  }`
            }`}
          >
            <Cog6ToothIcon className="h-6 w-6" /> Settings
          </div>
        </Link>
        <Link href={"/auth/signin"} onClick={handleLogout}>
          <div
            className={`flex items-center gap-3 py-2 my-2 px-1.5 rounded-2xl font-semibold justify-center ${
              pathname.startsWith("/admin/customizations")
                ? `${
                    state.theme.theme === "LIGHT"
                      ? "bg-blue-50 text-blue-700"
                      : "bg-blue-950 text-blue-300 bg-opacity-40"
                  }`
                : `${
                    state.theme.theme === "LIGHT"
                      ? "hover:bg-blue-50 text-black"
                      : "hover:bg-blue-950 text-stone-300"
                  }`
            }`}
          >
            Logout
          </div>
        </Link>
      </div>
    </div>
  );
}

export default SidebarMenu;

interface MenuProps {
  options: Options[];
  title: string;
  buttonStyles: string;
}

interface Options {
  title: string;
  routeName: string;
  icon: React.ReactNode;
  LinkrouteName: string;
}

function ToggleMenuOptions({ options, title, buttonStyles }: MenuProps) {
  const { state } = useGlobalState();
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();

  return (
    <div className="flex flex-col">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`${buttonStyles} relative overflow-hidden cursor-pointer font-semibold ${
          pathname.startsWith("/admin/information")
            ? `${
                state.theme.theme === "LIGHT"
                  ? "bg-blue-50 text-blue-700"
                  : "bg-blue-950 text-blue-300 bg-opacity-40"
              }`
            : `${
                state.theme.theme === "LIGHT"
                  ? "hover:bg-blue-50 text-black"
                  : "hover:bg-blue-950 text-stone-300"
              }`
        }`}
      >
        <div className="flex items-center gap-3">
          <CircleStackIcon className="h-6 w-6" />
          {title}
        </div>
        <ChevronDownIcon
          className={`h-4 w-4 absolute right-2 transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>
      <div
        className={`transition-all duration-700 overflow-y-auto custom-scrollbar ${
          isOpen ? " max-h-80" : "max-h-0"
        } overflow-hidden`}
      >
        {options.map((item, key) => (
          <Link href={`${item.LinkrouteName}`} key={key}>
            <div
              className={`${buttonStyles} pl-6 flex items-center gap-3 font-semibold ${
                pathname.startsWith(item.routeName)
                  ? `${
                      state.theme.theme === "LIGHT"
                        ? "bg-blue-50 text-blue-700"
                        : "bg-blue-950 text-blue-300 bg-opacity-40"
                    }`
                  : `${
                      state.theme.theme === "LIGHT"
                        ? "hover:bg-blue-50 text-black"
                        : "hover:bg-blue-950 text-stone-300"
                    }`
              }`}
            >
              <i className="h-6 w-6">{item.icon}</i>
              <p>{item.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

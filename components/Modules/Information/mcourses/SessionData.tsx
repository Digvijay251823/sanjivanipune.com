import { useGlobalState } from "@/Utils/State";
import React, { useEffect, useState } from "react";

function CourseData({
  coursecode,
  fieldName,
}: {
  coursecode: string;
  fieldName: "code" | "name" | "description";
}) {
  const { dispatch } = useGlobalState();
  const [isLoading, setIsLoading] = useState(false);
  const [courseData, setcourseData] = useState({
    code: "",
    name: "",
    description: "",
    createdBy: "",
  });
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `/api/admin/information/sessions/course/${coursecode}`
        );
        if (response.ok) {
          const responseData = await response.json();
          setcourseData(responseData?.content);
        } else {
          const errorData = await response.json();
          dispatch({
            type: "SHOW_TOAST",
            payload: {
              message: errorData.message || errorData.title,
              type: "ERROR",
            },
          });
        }
      } catch (error: any) {
        dispatch({
          type: "SHOW_TOAST",
          payload: {
            message: error.message || "Unexpected exception occured",
            type: "ERROR",
          },
        });
      } finally {
        setIsLoading(false);
      }
    })();
  }, [coursecode, dispatch]);
  return (
    <>
      {isLoading ? (
        <div className="bg-gray-200 h-8 w-32 mr-4 animate-pulse rounded-xl"></div>
      ) : (
        <div>
          {coursecode ? <div>{courseData[fieldName]}</div> : <p>null</p>}
        </div>
      )}
    </>
  );
}

export default CourseData;

"use client";
import { useGlobalState } from "@/Utils/State";
import React, { useEffect, useState } from "react";

function UserDetails({ email }: { email: string }) {
  const [isLoading, setIsLoading] = useState(true);
  const { state, dispatch } = useGlobalState();
  const [UserDetails, setUserDetails] = useState<VolunteerTypes | any>({});
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/admin/information/volunteer/${email}`
        );
        if (response.ok) {
          const responseData = await response.json();
          setUserDetails(responseData.content);
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
      } finally {
        setIsLoading(false);
      }
    })();
  }, [email, dispatch]);

  return (
    <div>
      {isLoading ? (
        <div>
          <p className="bg-gray-400 animate-pulse md:h-6 h-3 md:w-[150px] w-[80px] rounded-full"></p>
        </div>
      ) : (
        <div className=" line-clamp-1">
          {UserDetails?.initiatedName ? (
            <p>{UserDetails?.initiatedName}</p>
          ) : (
            <p>{`${UserDetails?.firstName} ${UserDetails?.lastName}`}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default UserDetails;

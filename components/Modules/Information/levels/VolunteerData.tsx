import { useGlobalState } from "@/Utils/State";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
interface Volunteers {
  id: string | number;
  firstName: string;
  lastName: string;
  initiatedName?: string | null;
  email: string;
  dob: string;
  contactNumber: string;
  waNumber: string;
  gender: "MALE" | "FEMALE";
  currentService: string;
  serviceInterested: string;
}

function VolunteerData({ volunteerid }: { volunteerid: string | number }) {
  const { dispatch } = useGlobalState();
  const [isLoading, setIsLoading] = useState(false);
  const [volunteerData, setVolunteerData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    initiatedName: "",
    email: "",
    dob: "",
    contactNumber: "",
    waNumber: "",
    gender: "MALE",
    currentService: "",
    serviceInterested: "",
  });
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `/api/admin/information/volunteers/${volunteerid}`
        );
        if (response.ok) {
          const responseData = await response.json();
          setVolunteerData(responseData?.content);
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
  }, [volunteerid, dispatch]);
  return (
    <>
      {isLoading ? (
        <div className="bg-gray-200 h-8 w-32 mr-4 animate-pulse rounded-xl"></div>
      ) : (
        <div>
          {volunteerid ? (
            <div>
              {volunteerData?.initiatedName
                ? `${volunteerData?.initiatedName}`
                : `${volunteerData?.firstName} ${volunteerData?.firstName}`}
            </div>
          ) : (
            <p>null</p>
          )}
        </div>
      )}
    </>
  );
}

export default VolunteerData;

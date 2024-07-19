import { SERVER_ENDPOINT } from "@/ConfigFetch";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const { activityId, participantId, programId, activityDate } =
    await req.json();
  const formData = {
    activityId,
    participantId,
    programId,
    activityDate,
  };
  const header = new Headers();
  header.append("Content-Type", "application/json");
  try {
    const response = await fetch(
      `${SERVER_ENDPOINT}/participant-activity/register`,
      {
        method: "POST",
        headers: header,
        body: JSON.stringify(formData),
      }
    );
    if (response.ok) {
      const responseData = await response.json();
      return NextResponse.json(
        { message: responseData.message },
        { status: 200 }
      );
    } else {
      if (response.status === 409) {
        return NextResponse.json(
          { message: "This Entry Already exists" },
          { status: 409 }
        );
      }
      if (response.status === 401) {
        return NextResponse.json(
          { message: "Request is unauthorized" },
          { status: 401 }
        );
      }
      const errorData = await response.json();
      return NextResponse.json(
        {
          message:
            errorData.message || errorData.title || "unexpected error occured",
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

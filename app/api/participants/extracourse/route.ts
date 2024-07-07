import { SERVER_ENDPOINT } from "@/ConfigFetch";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { participantId, levelId } = await req.json();
  const header = new Headers();
  header.append("Content-Type", "application/json");
  const formData = {
    participantId,
    levelId,
  };
  try {
    const response = await fetch(
      `${SERVER_ENDPOINT}/participant-registration/register`,
      {
        method: "POST",
        headers: header,
        body: JSON.stringify(formData),
      }
    );

    if (response.ok) {
      const responseData = await response.json();
      return NextResponse.json(
        { content: responseData },
        { status: response.status }
      );
    } else {
      if (response.status === 404) {
        return NextResponse.json(
          { message: "The Number Is Not Registered" },
          { status: response.status }
        );
      }
      if (response.status === 409) {
        return NextResponse.json(
          { message: "You Have Already Registered" },
          { status: response.status }
        );
      }
      const errorData = await response.json();
      return NextResponse.json(
        { message: errorData.message },
        { status: response.status }
      );
    }
    // return NextResponse.json({ content: "Success" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "something unexpected happened" },
      { status: 500 }
    );
  }
}

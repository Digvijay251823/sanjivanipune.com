import { SERVER_ENDPOINT } from "@/ConfigFetch";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const header = new Headers();
  const {
    scheduledSessionId,
    participantId,
    levelId,
    programId,
    scheduledSessionName,
    rsvp,
    membersComming,
  } = await req.json();

  header.append("Content-Type", "application/json");
  const formData: any = {
    scheduledSessionId,
    participantId,
    levelId,
    programId,
    scheduledSessionName,
    rsvp,
    membersComming,
  };

  try {
    const response = await fetch(`${SERVER_ENDPOINT}/rsvp/mark`, {
      method: "POST",
      headers: header,
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      return NextResponse.json(
        { message: " Successfully marked rsvp" },
        { status: 200 }
      );
    } else {
      if (response.status === 409) {
        return NextResponse.json(
          { message: "Successfully updated RSVP" },
          { status: 200 }
        );
      }
      const errorData = await response.json();
      return NextResponse.json(
        { message: errorData.message || errorData.title },
        { status: response.status }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || error.title },
      { status: 500 }
    );
  }
}

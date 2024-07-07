import { SERVER_ENDPOINT } from "@/ConfigFetch";
import { decrypt } from "@/Utils/helpers/auth";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const response = await fetch(`${SERVER_ENDPOINT}/level/`);
    if (response.ok) {
      const responseData = await response.json();
      return NextResponse.json(
        { content: responseData },
        { status: response.status }
      );
    } else {
      const errorData = await response.json();
      return NextResponse.json(
        { message: errorData.message || errorData.title },
        { status: response.status }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Unexpected exception occured" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  const {
    name,
    description,
    programName,
    expectedStartDate,
    expectedEndDate,
    displayName,
    sessionDay,
    acceptingNewParticipants,
    sessionTime,
    posterUrl,
    preacher1,
    preacher2,
    mentor,
    coordinator,
    programId,
    number,
  } = await req.json();
  const header = new Headers();
  const cookiesValue = cookies().get("AUTHRES")?.value;
  const Parsedcookies = cookiesValue && JSON.parse(cookiesValue);
  if (!Parsedcookies) {
    throw new Error("Please login to access");
  }
  const buffer = Buffer.from(decrypt(Parsedcookies.buf).toString()).toString(
    "base64"
  );

  header.append("Content-Type", "application/json");
  header.append("Authorization", `Basic ${buffer}`);
  const formData: any = {
    name,
    description,
    programName,
    expectedStartDate,
    expectedEndDate,
    displayName,
    sessionDay,
    acceptingNewParticipants,
    sessionTime,
    posterUrl,
    preacher1,
    preacher2,
    mentor,
    coordinator,
    programId,
    number,
  };
  try {
    const response = await fetch(`${SERVER_ENDPOINT}/level/create`, {
      method: "POST",
      headers: header,
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const responseData = await response.json();
      return NextResponse.json(
        { message: responseData.message },
        { status: response.status }
      );
    } else {
      if (response.status === 409) {
        return NextResponse.json(
          { message: "Data already exists please try another value" },
          { status: response.status }
        );
      }
      if (response.status === 401) {
        return NextResponse.json(
          { message: "You Don't Have Access To Create Level" },
          { status: response.status }
        );
      }
      const errorData = await response.json();
      return NextResponse.json(
        {
          message: errorData.message || errorData.title,
        },
        { status: response.status }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Unexpected exception occured" },
      { status: 500 }
    );
  }
}

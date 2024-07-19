import { SERVER_ENDPOINT } from "@/ConfigFetch";
import { decrypt } from "@/Utils/helpers/auth";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const {
    name,
    description,
    startTime,
    courseName,
    levelId,
    sessionId,
    programId,
  } = await req.json();
  const formData: any = {
    name,
    description,
    startTime,
    courseName,
    levelId,
    sessionId,
    programId,
  };
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
  try {
    const response = await fetch(`${SERVER_ENDPOINT}/session/schedule`, {
      method: "POST",
      headers: header,
      body: JSON.stringify(formData),
    });

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
          { message: "Your dont have access to the resource" },
          { status: 401 }
        );
      }
      const errorData = await response.json();
      return NextResponse.json(
        {
          message:
            errorData.message ||
            errorData.title ||
            "unexpected exception occured",
        },
        { status: response.status }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

import { SERVER_ENDPOINT } from "@/ConfigFetch";
import { decrypt } from "@/Utils/helpers/auth";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const {
    programId,
    numberOfRounds,
    first8RoundsCompletedTime,
    next8RoundsCompletedTime,
    wakeUpTime,
    sleepTime,
    prabhupadaBookReading,
    nonPrabhupadaBookReading,
    prabhupadaClassHearing,
    guruClassHearing,
    otherClassHearing,
    speaker,
    attendedArti,
    mobileInternetUsage,
    topic,
    visibleSadhana,
  } = await req.json();
  const formData = {
    programId,
    numberOfRounds,
    first8RoundsCompletedTime,
    next8RoundsCompletedTime,
    wakeUpTime,
    sleepTime,
    prabhupadaBookReading,
    nonPrabhupadaBookReading,
    prabhupadaClassHearing,
    guruClassHearing,
    otherClassHearing,
    speaker,
    attendedArti,
    mobileInternetUsage,
    topic,
    visibleSadhana,
  };
  const header = new Headers();
  const cookiesValue = cookies().get("AUTHRES")?.value;
  const Parsedcookies = cookiesValue && JSON.parse(cookiesValue);
  if (!Parsedcookies) {
    return NextResponse.json(
      { message: "Please login to access" },
      { status: 401 }
    );
  }
  const buffer = Buffer.from(decrypt(Parsedcookies.buf).toString()).toString(
    "base64"
  );

  header.append("Content-Type", "application/json");
  header.append("Authorization", `Basic ${buffer}`);

  try {
    const response = await fetch(`${SERVER_ENDPOINT}/sadhana-form/generate`, {
      method: "POST",
      headers: header,
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const responseData = await response.json();

      return NextResponse.json(
        { message: "Generated Sadhana Form Successfully" },
        { status: 200 }
      );
    } else {
      if (response.status === 401) {
        return NextResponse.json(
          { message: "Your dont have access to Configure Sadhana Form" },
          { status: 401 }
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
      { message: error.message || "Unexpected exception occured" },
      { status: 500 }
    );
  }
}

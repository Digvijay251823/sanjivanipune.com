import { SERVER_ENDPOINT } from "@/ConfigFetch";
import { decrypt } from "@/Utils/helpers/auth";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, url: string) {
  const {
    firstName,
    lastName,
    initiatedName,
    contactNumber,
    waNumber,
    age,
    email,
    password,
    gender,
    address,
    serviceInterests,
    currentServices,
  } = await req.json();
  const formData: any = {
    firstName,
    lastName,
    initiatedName,
    contactNumber,
    waNumber,
    age,
    email,
    password,
    gender,
    address,
    serviceInterests,
    currentServices,
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
    const response = await fetch(`${SERVER_ENDPOINT}/volunteer/create`, {
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
          { message: "You Already Have an account" },
          { status: 409 }
        );
      }
      if (response.status === 401) {
        return NextResponse.json(
          {
            message: "You Dont Have Permission To Create Volunteer",
          },
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

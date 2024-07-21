import { SERVER_ENDPOINT } from "@/ConfigFetch";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const { firstName, lastName, contactNumber, gender, waNumber, age, city } =
    await req.json();
  const formData = {
    firstName,
    lastName,
    contactNumber,
    waNumber,
    age,
    gender,
    city,
  };
  const header = new Headers();
  header.append("Content-Type", "application/json");
  try {
    const response = await fetch(`${SERVER_ENDPOINT}/participant/create`, {
      method: "POST",
      headers: header,
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      return NextResponse.json(
        { message: "Successfully registerd participant" },
        { status: 200 }
      );
    } else {
      if (response.status === 409) {
        return NextResponse.json(
          { message: "You have already registerd" },
          { status: response.status }
        );
      }
      const errorData = await response.json();
      return NextResponse.json(
        { message: errorData.message || errorData.title },
        { status: response.status }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

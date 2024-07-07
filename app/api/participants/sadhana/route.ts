import { SERVER_ENDPOINT } from "@/ConfigFetch";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const formData = await req.json();
  const header = new Headers();
  header.append("Content-Type", "application/json");
  try {
    const response = await fetch(
      `${SERVER_ENDPOINT}/participant-sadhana/record`,
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
        { status: response.status }
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
            errorData.message ||
            errorData.title ||
            "unexpected exception occured",
        },
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

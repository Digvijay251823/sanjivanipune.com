import { SERVER_ENDPOINT } from "@/ConfigFetch";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { volunteerid: string } }
) {
  try {
    const response = await fetch(
      `${SERVER_ENDPOINT}/volunteer/id/${params.volunteerid}`
    );
    if (response.ok) {
      const responseData = await response.json();
      return NextResponse.json(
        { content: responseData },
        { status: response.status }
      );
    } else {
      const errorData = await response.json();
      return NextResponse.json(
        {
          message: errorData.message || errorData.title,
        },
        { status: response.status }
      );
    }
    return NextResponse.json({ message: "ran" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Unexpected exception occured" },
      { status: 500 }
    );
  }
}

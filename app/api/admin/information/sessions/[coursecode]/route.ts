import { SERVER_ENDPOINT } from "@/ConfigFetch";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: { coursecode: string } }
) {
  try {
    const response = await fetch(
      `${SERVER_ENDPOINT}/session/course/${params.coursecode}?size=50`
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
        { message: errorData.message || errorData.title },
        { status: response.status }
      );
    }
  } catch (error: any) {
    return NextResponse.json({
      message: error.message || "Unexpectd exception occured",
    });
  }
}

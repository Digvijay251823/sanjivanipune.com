import { SERVER_ENDPOINT } from "@/ConfigFetch";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, res: NextResponse) {
  const cookiesValue = cookies().get("ROLE")?.value;
  const auth = "digvijays.edake2002@gmail.com:Prabhupada@108";
  const headers = new Headers();
  headers.append("Authorization", `${auth}`);

  try {
    const response = await fetch(`${SERVER_ENDPOINT}/volunteer/?size=100`, {
      method: "GET",
      headers: headers,
    });
    if (response.ok) {
      const responseData = await response.json();
      return NextResponse.json({ content: responseData }, { status: 200 });
    } else {
      const errorData = await response.json();
      return NextResponse.json(
        { message: errorData.message || errorData.title },
        { status: 200 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 200 });
  }
}
export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  try {
    const response = await fetch(`${SERVER_ENDPOINT}/volunteer/`);
    if (response.ok) {
      const responseData = await response.json();
      return NextResponse.json(
        { message: responseData.message },
        { status: 200 }
      );
    } else {
      if (response.status === 409) {
        return NextResponse.json(
          { message: "Data Already exists try another values" },
          { status: response.status }
        );
      }
      const errorData = await response.json();
      return NextResponse.json(
        { message: errorData.message || errorData.title },
        { status: 200 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 200 });
  }
}

import { SERVER_ENDPOINT } from "@/ConfigFetch";
import { decrypt } from "@/Utils/helpers/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { email: string } }
) {
  const decodedEmail = decrypt(params.email);

  try {
    const response = await fetch(
      `${SERVER_ENDPOINT}/volunteer/email/${decodedEmail.split(":")[0]}`
    );
    if (response.ok) {
      const responseData = await response.json();
      return NextResponse.json({ content: responseData.content[0] }, { status: 200 });
    } else {
      if (response.status === 404) {
        return NextResponse.json(
          { message: "Resourse not found" },
          { status: 404 }
        );
      }
      const errorData = await response.json();
      return NextResponse.json({ message: errorData }, { status: 200 });
    }
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "something unexpected happened" },
      { status: 500 }
    );
  }
}

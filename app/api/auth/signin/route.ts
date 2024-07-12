import { SERVER_ENDPOINT } from "@/ConfigFetch";
import { decrypt, encrypt } from "@/Utils/helpers/auth";

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const { email, password } = await req.json();
  try {
    const encrypted = encrypt(`${email}:${password}`);
    console.log(encrypted);
    const response = await fetch(
      `${SERVER_ENDPOINT}/auth/authenticate?email=${email}&password=${password}`
    );
    if (response.ok) {
      const responseData = await response.json();
      responseData[0].buf = encrypted;
      cookies().set("AUTHRES", JSON.stringify(responseData[0]), {
        maxAge: 1296000,
      });
      return NextResponse.json(
        { message: "Successfully authenticated", content: responseData },
        { status: 200 }
      );
    } else {
      if (response.status === 401) {
        return NextResponse.json(
          { message: "you have entered wrong credentials" },
          { status: response.status }
        );
      }
      const errorData = await response.json();
      return NextResponse.json(
        { message: errorData.message },
        { status: response.status }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

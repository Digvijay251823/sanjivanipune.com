import { SERVER_ENDPOINT } from "@/ConfigFetch";
import { decrypt } from "@/Utils/helpers/auth";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const header = new Headers();
  const cookiesValue = cookies().get("AUTHRES")?.value;
  const ROLE = cookiesValue && JSON.parse(cookiesValue);
  const decoded = decrypt(ROLE.buf).toString();
  const email = decoded.split(":")[0];
  const buffer = Buffer.from(decrypt(ROLE.buf).toString()).toString("base64");
  header.append("Content-Type", "application/json");
  header.append("Authorization", `Basic ${buffer}`);
  try {
    const { password } = await req.json();
    if (ROLE === "") {
      return NextResponse.json(
        { message: "you are not authenticated" },
        { status: 401 }
      );
    }

    if (ROLE.name === "ROLE_ADMIN") {
      console.log(buffer);
      const response = await fetch(
        `${SERVER_ENDPOINT}/auth/admin/changePassword?email=${encodeURIComponent(
          email
        )}&password=${encodeURIComponent(password)}`,
        { method: "GET", headers: header }
      );
      if (response.ok) {
        return NextResponse.json(
          { message: "changed password successfully" },
          { status: 200 }
        );
      } else {
        if (response.status === 401) {
          return NextResponse.json(
            { message: "You are not authenticated" },
            { status: response.status }
          );
        }
        const errorData = await response.json();
        return NextResponse.json(
          { message: errorData.message },
          { status: response.status }
        );
      }
    } else {
      const response = await fetch(
        `${SERVER_ENDPOINT}/auth/user/changePassword?password=${password}`,
        { method: "GET", headers: header }
      );
      if (response.ok) {
        return NextResponse.json(
          { message: "changed password successfully" },
          { status: 200 }
        );
      } else {
        const errorData = await response.json();
        return NextResponse.json(
          { message: errorData.message },
          { status: response.status }
        );
      }
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

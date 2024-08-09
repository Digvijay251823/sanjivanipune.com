import { SERVER_ENDPOINT } from "@/ConfigFetch";
import { decrypt } from "@/Utils/helpers/auth";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const response = await fetch(`${SERVER_ENDPOINT}/program/`);
    if (response.ok) {
      const responseData = await response.json();
      return NextResponse.json({ content: responseData }, { status: 200 });
    } else {
      const errorData = await response.json();
      return NextResponse.json(
        { message: errorData.message || errorData.title },
        { status: response.status }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.message || error.title }, {});
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  const headers = new Headers();
  const cookiesValue = cookies().get("AUTHRES")?.value;
  const Parsedcookies = cookiesValue && JSON.parse(cookiesValue);
  if (!Parsedcookies) {
    throw new Error("Please login to access");
  }
  const buffer = Buffer.from(decrypt(Parsedcookies.buf).toString()).toString(
    "base64"
  );

  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Basic ${buffer}`);
  try {
    const {
      name,
      description,
      incharge,
      preacher,
      mentor,
      coordinator,
      audienceType,
      programType,
      location,
    } = await req.json();
    const formData = {
      name,
      description,
      incharge,
      preacher,
      mentor,
      coordinator,
      audienceType,
      programType,
      location,
    };

    if (!name) {
      return NextResponse.json(
        {
          message: "not able to get name",
        },
        {
          status: 400,
        }
      );
    } else if (!description) {
      return NextResponse.json(
        {
          message: "not able to get description",
        },
        {
          status: 400,
        }
      );
    } else if (!incharge || isNaN(Number(incharge))) {
      return NextResponse.json(
        {
          message: "incharge not available in request or is invalid id",
        },
        {
          status: 400,
        }
      );
    } else if (!preacher || isNaN(Number(preacher))) {
      return NextResponse.json(
        {
          message: "preacher not available in request or is invalid id",
        },
        {
          status: 400,
        }
      );
    } else if (!mentor || isNaN(Number(mentor))) {
      return NextResponse.json(
        {
          message: "preacher not available in request or is invalid id",
        },
        {
          status: 400,
        }
      );
    } else if (!coordinator || isNaN(Number(coordinator))) {
      return NextResponse.json(
        {
          message: "coordinator not available in request or is invalid id",
        },
        {
          status: 400,
        }
      );
    } else if (!audienceType) {
      return NextResponse.json(
        {
          message: "audienceType not available in request",
        },
        {
          status: 400,
        }
      );
    }
    const response = await fetch(`${SERVER_ENDPOINT}/program/create`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      const responseData = await response?.json();
      return NextResponse.json(
        { message: responseData.message },
        { status: response.status }
      );
    } else {
      if (response.status === 401) {
        return NextResponse.json(
          { message: "Your Are Not Allowed To Create Prorgam" },
          { status: 401 }
        );
      }
      if (response.status === 409) {
        return NextResponse.json(
          { message: "This Program already exists so can't be created" },
          { status: 409 }
        );
      }
      if (response.status === 404) {
        return NextResponse.json(
          { message: "Some Details You Filled Might Not Correct" },
          { status: 404 }
        );
      }
      if (response.status === 400) {
        return NextResponse.json({ message: "Bad Request" }, { status: 400 });
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

import { NextRequest, NextResponse } from "next/server";
import { SERVER_ENDPOINT } from "@/ConfigFetch";
import { cookies, headers } from "next/headers";
import { decrypt } from "@/Utils/helpers/auth";
import { SERVER_REFERENCE_MANIFEST } from "next/dist/shared/lib/constants";

export async function POST(req: NextRequest, res: NextResponse) {
  const {
    code,
    name,
    description,
    sessionName,
    sessionDescription,
    sessionCode,
    durationInMinutes,
  } = await req.json();

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
    const courseData = {
      code,
      name,
      description,
    };
    const responseCourseUpdaload = await fetch(
      `${SERVER_ENDPOINT}/course/create`,
      {
        method: "POST",
        headers: header,
        body: JSON.stringify(courseData),
      }
    );

    if (responseCourseUpdaload.ok) {
      const createSession = await fetch(`${SERVER_ENDPOINT}/session/create`, {
        method: "POST",
        headers: header,
        body: JSON.stringify(courseData),
      });
      if (createSession.ok) {
        return NextResponse.json(
          { message: "Session Created SuccessFully" },
          { status: 200 }
        );
      } else {
        if (createSession.status === 409) {
          return NextResponse.json(
            { message: "session already exist so cant be created" },
            { status: 409 }
          );
        }
        if (createSession.status === 404) {
          return NextResponse.json(
            { message: "session already exist so cant be created" },
            { status: 404 }
          );
        }
        const errorDataSession = await createSession.json();
        return NextResponse.json(
          {
            message:
              errorDataSession.message ||
              errorDataSession.title ||
              "an unexpected error occured while",
          },
          { status: 500 }
        );
      }
    } else {
      if (responseCourseUpdaload.status === 409) {
        const sessionData = {
          code: sessionCode,
          name: sessionName,
          description: sessionDescription,
          courseCode: code,
          durationInMinutes: durationInMinutes,
        };
        const createSession = await fetch(`${SERVER_ENDPOINT}/session/create`, {
          method: "POST",
          headers: header,
          body: JSON.stringify(sessionData),
        });

        if (createSession.ok) {
          return NextResponse.json(
            { message: "Session Created SuccessFully" },
            { status: 200 }
          );
        } else {
          if (createSession.status === 409) {
            return NextResponse.json(
              { message: "session already exist so cant be created" },
              { status: 409 }
            );
          }
          if (createSession.status === 404) {
            return NextResponse.json(
              { message: "Course Not Found so cant be created" },
              { status: 404 }
            );
          }
          const errorDataSession = await createSession.json();
          return NextResponse.json(
            {
              message:
                errorDataSession.message ||
                errorDataSession.title ||
                "an unexpected error occured while creating session",
            },
            { status: 500 }
          );
        }
      }
      if (responseCourseUpdaload.status === 400) {
        return NextResponse.json(
          { message: "Course Already Exist so can't be created" },
          { status: 400 }
        );
      }
      if (responseCourseUpdaload.status === 401) {
        return NextResponse.json(
          { message: "You Might Not Have Access To Create Course" },
          { status: 401 }
        );
      }
      const errorResponseCourse = await responseCourseUpdaload.json();

      return NextResponse.json(
        {
          message:
            errorResponseCourse.message ||
            errorResponseCourse.title ||
            "Unexpected exception occured",
        },
        { status: responseCourseUpdaload.status }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || error.title },
      { status: 500 }
    );
  }
}

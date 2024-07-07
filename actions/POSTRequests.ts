"use server";
import { SERVER_ENDPOINT } from "@/ConfigFetch";
import { decrypt } from "@/Utils/helpers/auth";
import { cookies, headers } from "next/headers";

export async function POST(formData: FormData, url: string) {
  const header = new Headers();
  header.append("Content-Type", "application/json");
  try {
    const response = await fetch(`${url}`, {
      method: "POST",
      headers: header,
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      const responseData = await response.json();
      return { message: responseData.message };
    } else {
      if (response.status === 409) {
        throw new Error("This Entry Already exists");
      }
      if (response.status === 401) {
        throw new Error("Request is unauthorized");
      }
      const errorData = await response.json();
      throw new Error(errorData.message || errorData.title);
    }
  } catch (error: any) {
    throw error;
  }
}

export async function POSTADMIN(formData: FormData, url: string) {
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
    const response = await fetch(`${url}`, {
      method: "POST",
      headers: header,
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const responseData = await response.json();

      return { message: responseData.message };
    } else {
      if (response.status === 409) {
        throw new Error("This Entry Already exists");
      }
      if (response.status === 401) {
        throw new Error("Your dont have access to the resource");
      }
      const errorData = await response.json();
      throw new Error(errorData.message || errorData.title);
    }
  } catch (error: any) {
    throw new Error(error.message || "Unexpected exception occured");
  }
}

export async function POSTADMINCOURSES(formData: {
  code: string;
  name: string;
  description: string;
  sessionDescription: string;
  sessionName: string;
  sessionCode: string;
  durationInMinutes: number;
}) {
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
  const course = {
    code: formData.code,
    name: formData.name,
    description: formData.description,
  };
  const session = {
    code: formData.sessionCode,
    name: formData.sessionName,
    description: formData.sessionDescription,
    durationInMinutes: formData.durationInMinutes,
  };
  try {
    const response = await fetch(`${SERVER_ENDPOINT}/course/create`, {
      method: "POST",
      headers: header,
      body: JSON.stringify(course),
    });
    const responseSession = await fetch(`${SERVER_ENDPOINT}/session/create`, {
      method: "POST",
      headers: header,
      body: JSON.stringify(session),
    });
    if (response.ok && responseSession.ok) {
      const responseData = await response.json();
      const responseSessionData = await responseSession.json();
      return {
        message: `${responseData.message} ${responseSessionData.message}`,
      };
    } else {
      if (response.status === 409 || responseSession.status === 409) {
        throw new Error("This Entry Already exists");
      }
      if (response.status === 401) {
        throw new Error("Your dont have access to the resource");
      }
      const errorData = await response.json();
      const errorSessionData = await responseSession.json();
      console.log(`${errorData} ${errorSessionData}`);
      throw new Error(errorData.message || errorData.title);
    }
  } catch (error: any) {
    throw new Error(error.message || "Unexpected exception occured");
  }
}

export async function LOGOUT() {
  try {
    cookies().delete("AUTHRES");
    return { message: "loggedout successfully" };
  } catch (error: any) {
    throw new Error(error.message || "Unexpected exception occured");
  }
}

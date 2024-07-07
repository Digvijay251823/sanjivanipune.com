"use server";
export async function POST(
  formData: FormData,
  url: string,
  state?: any
): Promise<{ message: any }> {
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
    throw new Error(error.message);
  }
}

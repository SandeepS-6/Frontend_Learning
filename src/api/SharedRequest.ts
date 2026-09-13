export default async function ShareRequest(
  route: string,
  method: string,
  bodyData: object | null | undefined,
) {
  const apiObject: RequestInit = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };

  if (method === "PUT" || method === "POST" || method === "PATCH") {
    // Add a request body only for methods that send data.
    apiObject.body = JSON.stringify(bodyData);
  }

  const api = await fetch(`${import.meta.env.VITE_API_URL}${route}`, apiObject);

  const content_types = api.headers.get("content-type");

  try {
    if (content_types?.startsWith("application/json")) {
      //Checking the header type
      //types are application/json, text/html, pdf/something so many typoes
      // Parse the response body only when the server returns JSON.
      const response = await api.json();
      if (!api.ok) {
        return {
          response: api,
          data: response,
        };
      }
      return {
        response: api,
        data: response,
      };
    } else {
      throw new Error(
        `${JSON.stringify(content_types)} This Content Type not handled`, // The shared request layer currently supports JSON responses only.
      );
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
}

//This is file for common http work and then  using this we call in publicfile and protected file but protected need api headers so we need to return the headers and response for public

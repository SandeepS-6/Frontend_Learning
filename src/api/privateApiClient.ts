import ShareRequest from "./SharedRequest";

export default async function privateApiClient(
  route: string,
  method: string,
  bodyData: object | null | undefined,
) {
  const refreshObject: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };
  let privateApiClientResponse = await ShareRequest(route, method, bodyData);

  if (
    privateApiClientResponse.response.status === 401 &&
    route !== "/refresh"
  ) {
    //check the route in the condition
    // 2nd condition will handle the looping system
    const refreshApi = await fetch(
      `${import.meta.env.VITE_API_URL}/refresh`,
      refreshObject,
    );

    if (refreshApi.ok) {
      privateApiClientResponse = await ShareRequest(route, method, bodyData);
      return privateApiClientResponse.data;
    } else {
      throw new Error("refresh token not succesfully ");
    }
  } else return privateApiClientResponse.data;
}

import ShareRequest from "./SharedRequest";

export default async function PublicApiClient(
  route: string,
  method: string,
  bodyData: object | null | undefined,
) {
  const publicApiCalling = await ShareRequest(route, method, bodyData);

  return publicApiCalling.data;
}

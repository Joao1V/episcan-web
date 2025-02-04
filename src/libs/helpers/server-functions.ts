import { headers } from "next/headers";
import qs from "qs";

interface ServerQueryParams {
  url: string;
  queryString:string;
  filters: Record<string, any>;

}
export async function getQueryParams(): Promise<ServerQueryParams> {
  const headersList = await headers();
  const fullUrl = headersList.get("referer") || "";

  if (!fullUrl) {
    return {
      url: "",
      queryString: "",
      filters: {},
    };
  }

  const url = new URL(fullUrl);
  const queryString = url.search; // Remove o "?"
  const filters = qs.parse(queryString);

  return {
    url: fullUrl,
    queryString,
    filters,
  };
}

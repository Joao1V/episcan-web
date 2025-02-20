import { headers } from "next/headers";
import qs from "qs";

interface ServerQueryParams {
  url: string;
  search:string;
  pathname:string;
  filters: Record<string, any>;

}
export async function getQueryParams(): Promise<ServerQueryParams> {
  const headersList = await headers();
  const fullUrl = headersList.get("x-url") || "";

  if (!fullUrl) {
    return {
      url: "",
      search: "",
      filters: {},
      pathname: ''
    };
  }

  const url = new URL(fullUrl);
  const search = url.search
  const pathname = url.pathname;
  const filters = qs.parse(search, {ignoreQueryPrefix: true});

  return {
    url: fullUrl,
    search,
    filters,
    pathname
  };
}

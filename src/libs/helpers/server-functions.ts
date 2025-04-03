import { setCookie } from 'cookies-next';
import { getCookie } from 'cookies-next/server';
import { headers } from 'next/headers';
import { cookies } from 'next/headers';

import qs from 'qs';

interface ServerQueryParams {
   url: string;
   search: string;
   pathname: string;
   filters: Record<string, any>;
}
export async function getQueryParams(): Promise<ServerQueryParams> {
   const headersList = await headers();
   const fullUrl = headersList.get('x-url') || '';

   if (!fullUrl) {
      return {
         url: '',
         search: '',
         filters: {},
         pathname: '',
      };
   }

   const url = new URL(fullUrl);
   const search = url.search;
   const pathname = url.pathname;
   const filters = qs.parse(search, { ignoreQueryPrefix: true });

   return {
      url: fullUrl,
      search,
      filters,
      pathname,
   };
}

export class Cookies {
   static async get(key: string) {
      const result = await getCookie(key, { cookies });

      if (result) {
        return JSON.parse(result)
      }
      return undefined;
   }

   static set(key: string, data: any) {
      return setCookie(key, data, { cookies });
   }
}

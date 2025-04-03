import { deleteCookie, hasCookie } from 'cookies-next/client';
export function fakeApi(
   delay = 1000,
   { response, status }: { response?: any; status?: 'ok' | 'error' },
) {
   return new Promise((resolve, reject) => {
      setTimeout(() => {
         if (status === 'error') {
            reject(new Error('Something went wrong!'));
         } else {
            resolve(response);
         }
      }, delay);
   });
}

export function removeAllCookies(keys: any) {
   Object.values(keys).forEach((value) => {
      if (typeof value === 'object') {
         removeAllCookies(value);
      } else if (hasCookie(`${value}`)) {
         deleteCookie(`${value}`);
      }
   });
}

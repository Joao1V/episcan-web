export const API_HEADER_MAIN = {
   Accept: 'application/json',
   'Content-Type': 'application/json',
   'X-App-Package': 'com.ipsi.web',
   'X-Client-Device': 'web',
   'X-Version-Name': '2.0.0',
} as const;

export const API_HEADER_CRAFTY = {
   Accept: 'application/json',
   'Content-Type': 'application/json',
   'X-Client-Device': 'web',
   'X-Version-Name': '2.0.0',
   'X-App-Package': process.env.NEXT_PUBLIC_APPLICATION_PACKAGE,
} as const;

export const API_HEADER_NEXT = {
   'Content-Type': 'application/json',
} as const;

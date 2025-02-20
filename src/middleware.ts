import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
   (req) => {
      const requestHeaders = new Headers(req.headers);
      requestHeaders.set('x-url', req.url);

      return NextResponse.next({
         request: {
            headers: requestHeaders,
         },
      });
   },
   {
      callbacks: {
         authorized: ({ token }) => !!token,
      },
   },
);
export const config = { matcher: ['/painel/:path*'] };

import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export default withAuth(
   async (req) => {
      const requestHeaders = new Headers(req.headers);
      requestHeaders.set('x-url', req.url);

      const token = await getToken({ req: req, secret: process.env.NEXTAUTH_SECRET });

      const isLoggedIn = !!token;
      const url = req.nextUrl;
      // Se estiver logado e estiver na home (/), redireciona para /painel, deixei if desativo pq middlware nao roda.
      if (isLoggedIn && url.pathname === '/') {
         const redirectUrl = new URL('/painel', req.url);
         return NextResponse.redirect(redirectUrl);
      }
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

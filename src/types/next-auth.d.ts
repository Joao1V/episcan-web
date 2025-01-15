import NextAuth, { DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
   interface Session {
      user: any;
      token: string;
   }

   interface Token {
      access: {
         token: string;
      };
   }
}

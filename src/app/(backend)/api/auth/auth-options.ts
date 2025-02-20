import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import api from '@/libs/axios';

type UserResponse = {
   HTTPStatus: number;
   executed: boolean;
   userIdentified: boolean;
   message: string;
   userToken: string;
   object: any;
};

const authOptions: NextAuthOptions = {
   secret: process.env.NEXTAUTH_SECRET,
   pages: {
      signIn: '/login',
      newUser: '/registro',
   },
   session: {
      strategy: 'jwt',
      maxAge: 6000,
   },
   callbacks: {
      async jwt({ token, user, session, trigger }) {
         if (user) {
            token.user = user;
         }

         if (trigger === 'update') {
            token.user = session;
            token.token = session.token;
         }

         return token;
      },
      async session({ session, token }) {
         session.user = token.user;
         session.token = session.user.access.token;
         return session;
      },
   },
   providers: [
      CredentialsProvider({
         name: 'credentials',
         credentials: {
            login: { type: 'string' },
            password: { type: 'string' },
         },
         async authorize(credentials) {
            const { login, password } = credentials ?? {};

            try {
               const user: UserResponse = await api.post(
                  `/access/${process.env.NEXT_PUBLIC_COMPANY_IDENTIFIER}/auth`,
                  { login, password },
               );
               const me: any = await api.get('/me', null, { userToken: user.userToken });

               if (me.object) {
                  return {
                     ...me?.object,
                     access: {
                        token: user.userToken,
                     },
                  };
                  // return user.object;
               }
               return null;
            } catch (error: any) {
               if (error) {
                  throw new Error(error.message, {
                     cause: error.cause,
                  });
               }
            }
         },
      }),
   ],
};
export default authOptions;

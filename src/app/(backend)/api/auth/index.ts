import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';

import authOptions from '@/app/(backend)/api/auth/auth-options';

export async function auth(
   ...args:
      | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
      | [NextApiRequest, NextApiResponse]
      | []
) {
   return await getServerSession(...args, authOptions);
}

export async function getApiToken() {
   const response = await auth();

   if (response) {
      return response.token;
   }
   return null;
}

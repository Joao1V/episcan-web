import { isServer } from '../utils/constants';

import { getApiToken } from '@/app/(backend)/api/auth';

type Token = string | null;

let access: Token = null;

export const getToken = async (): Promise<Token> => {
   if (isServer) return await getApiToken();
   if (access) return access;

   return null;
};

export const saveToken = (token: Token) => {
   console.log('--->TOKEN SALVO');
   access = token;
};

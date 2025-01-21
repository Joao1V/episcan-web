import { signIn } from 'next-auth/react';

import md5 from 'md5';

interface Login {
   login: string;
   password: string;
}
export async function login(payload: Login) {
   payload.password = md5(payload.password);
   const { login, password } = payload;
   const response = await signIn('credentials', {
      login,
      password,
      redirect: false,
   });
   return {
      ...response,
      redirectTo: '/painel',
   };
}

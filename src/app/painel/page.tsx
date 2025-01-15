'use client';

import { signOut, useSession } from 'next-auth/react';

import api from '@/libs/axios';

export default function Page() {
   const { data, status } = useSession();

   return (
      <div>
         <h2>Voce está {status}</h2>
         <button type={'submit'} onClick={() => signOut()}>
            SAIR
         </button>
      </div>
   );
}

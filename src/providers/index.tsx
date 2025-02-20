import { ReactNode } from 'react';
import 'react-tooltip/dist/react-tooltip.css';

import { auth } from '@/app/(backend)/api/auth';

import NextAuthProvider from '@/providers/NextAuthProvider';
import ReactQueryProvider from '@/providers/ReactQueryProvider';
import ToastProvider from '@/providers/ToastProvider';

interface ProvidersProps {
   children: ReactNode;
}
export default async function Providers({ children }: ProvidersProps) {
   let session = await auth();

   if (session) {
      // const me: Record<string, any> = await api.get('/me');
      // if (me.object) {
      //    console.log('SESSAO ATUALIZADA');
      //    session.user = {
      //       ...me.object,
      //       access: {
      //          token: session?.token
      //       },
      //    };
      // }
   }

   return (
      <NextAuthProvider session={session}>
         <ReactQueryProvider>{children}</ReactQueryProvider>
         <ToastProvider />
      </NextAuthProvider>
   );
}

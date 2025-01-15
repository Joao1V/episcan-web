import { ReactNode } from 'react';

import { auth } from '@/app/(backend)/api/auth';

import NextAuthProvider from '@/providers/NextAuthProvider';
import ReactQueryProvider from '@/providers/ReactQueryProvider';
import ToastProvider from '@/providers/ToastProvider';

interface ProvidersProps {
   children: ReactNode;
}

export default async function Providers({ children }: ProvidersProps) {
   const session = await auth();

   return (
      <NextAuthProvider session={session}>
         <ReactQueryProvider>{children}</ReactQueryProvider>
         <ToastProvider />
      </NextAuthProvider>
   );
}

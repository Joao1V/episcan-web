'use client';

import React, { ReactNode, useEffect, useState } from 'react';

import { useSession } from 'next-auth/react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { saveToken } from '@/libs/axios/utils/token';

export default function ReactQueryProvider({ children }: { children: ReactNode }) {
   const { data: session, status } = useSession();
   const [queryClient] = useState(
      () =>
         new QueryClient({
            defaultOptions: {
               queries: {
                  refetchOnWindowFocus: false,
                  refetchOnMount: false,
                  refetchOnReconnect: false,
                  retry: false,
                  staleTime: 5 * 1000,
               },
            },
         }),
   );

   useEffect(() => {
      if (session && status === 'authenticated') {
         saveToken(session.token);
      }
   }, [status]);

   return (
      <QueryClientProvider client={queryClient}>
         {children}
         <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
   );
}

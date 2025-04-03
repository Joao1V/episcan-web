'use client';

import React, { ReactNode, useEffect, useState } from 'react';

import { useSession } from 'next-auth/react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { saveToken } from '@/libs/axios/utils/token';
import { removeAllCookies } from '@/libs/helpers/functions';
import { COOKIES_KEYS } from '@/services/queries/queryKeys';

export default function ReactQueryProvider({
   children,
   token,
}: {
   children: ReactNode;
   token: string | undefined;
}) {
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
                  experimental_prefetchInRender: true,
                  queryFn: () => {},
               },
            },
         }),
   );
   if (token) {
      saveToken(token);
   }

   useEffect(() => {
      if (session && status === 'authenticated') {
         saveToken(session.token);
      }
      if (status === 'unauthenticated') {
         removeAllCookies(COOKIES_KEYS);
      }
   }, [status]);

   return (
      <QueryClientProvider client={queryClient}>
         {children}
         <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
   );
}

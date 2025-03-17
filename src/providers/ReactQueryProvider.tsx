'use client';

import React, { ReactNode, useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { saveToken } from '@/libs/axios/utils/token';

export default function ReactQueryProvider({
   children,
   token,
}: {
   children: ReactNode;
   token: string | undefined;
}) {
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

   return (
      <QueryClientProvider client={queryClient}>
         {children}
         <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
   );
}

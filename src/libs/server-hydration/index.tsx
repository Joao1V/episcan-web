import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';

import { ServerHydrationProps } from './types';

export default async function ServerHydration(props: ServerHydrationProps) {
   const { children, initialData } = props;

   if (!initialData) {
      throw new Error('Initial data is required');
   } else if (typeof initialData !== 'object') {
      throw new Error('Initial data is invalid');
   }

   const queryClient = new QueryClient();

   if (Array.isArray(initialData)) {
      for (const item of initialData) {
         await queryClient.prefetchQuery({
            queryKey: item.queryKey,
            queryFn: () => item.data,
         });
      }
   } else {
      await queryClient.prefetchQuery({
         queryKey: initialData.queryKey,
         queryFn: () => initialData.data,
      });
   }

   return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
}

'use client';

import { useQuery, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';

interface PaginationDefault {
   page: number;
   limit: number;
   search_global?: string;
   order_type?: 'ASC' | 'DESC';
}
type Paginate<TFilters> = PaginationDefault & TFilters;

interface UsePaginateOptions<TFilters> {
   initialFilters: Paginate<TFilters>;
}

interface UsePaginateReturn<TFilters> {
   paginate: Paginate<TFilters> | Record<any, any>;
   updateFilterValue: (label: keyof TFilters, value: any) => void;
   updateFilters: (newFilters: Partial<Paginate<TFilters>>) => void;
}

function usePaginate<TFilters extends object>(
   filterKey: string,
   options?: UsePaginateOptions<Paginate<TFilters>>,
): UsePaginateReturn<TFilters> {
   const { initialFilters: initialData } = options || {};

   const queryClient = useQueryClient();
   const queryKey = ['filters_paginates', filterKey];

   const { data: storedData } = useQuery({
      queryKey,
      queryFn: () => {
         console.log('oie');
         return initialData || {};
      },
      initialData: initialData,
   });

    const updateFilterValue = <K extends keyof TFilters>(
      label: K,
      value: TFilters[K],
   ) => {
      queryClient.setQueryData(queryKey, (oldData: Paginate<TFilters>) => ({
         ...oldData,
         [label]: value,
      }));
   };

   const updateFilters = (newFilters: Partial<Paginate<TFilters>>) => {
      queryClient.setQueryData(queryKey, (oldData: any) => {
         return {
            ...oldData,
            newFilters,
         };
      });
   };

   return { paginate: storedData || {}, updateFilterValue, updateFilters };
}

export { usePaginate };
export type { Paginate, PaginationDefault };

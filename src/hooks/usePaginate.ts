'use client';

import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';

interface PaginationDefault {
   page: number;
   limit: number;
   search_global?: string;
   order_type?: 'ASC' | 'DESC';
}
type PaginationParams<TFilters> = PaginationDefault & TFilters;

interface UsePaginateOptions<TFilters> {
   initialFilters: PaginationParams<TFilters>;
}

interface UsePaginateReturn<TFilters> {
   paginate: PaginationParams<TFilters>;
   updateFilterValue: (label: keyof TFilters, value: any) => void;
   updateFilters: (newFilters: Partial<PaginationParams<TFilters>>) => void;
}

function usePaginate<TFilters extends object>(
   filterKey: string,
   options?: UsePaginateOptions<PaginationParams<TFilters>>,
): UsePaginateReturn<TFilters> {
   const { initialFilters: initialData } = options || {};

   const queryClient = useQueryClient();
   const queryKey = ['filters_paginates', filterKey];

   const { data: storedData } = useSuspenseQuery<PaginationParams<TFilters>>({
      queryKey,
      initialData,
   });

    const updateFilterValue = <K extends keyof TFilters>(
      label: K,
      value: TFilters[K],
   ) => {
      queryClient.setQueryData(queryKey, (oldData: PaginationParams<TFilters>) => ({
         ...oldData,
         [label]: value,
      }));
   };

   const updateFilters = (newFilters: Partial<PaginationParams<TFilters>>) => {
      queryClient.setQueryData(queryKey, (oldData: any) => {
         return {
            ...oldData,
            newFilters,
         };
      });
   };

   return { paginate: storedData, updateFilterValue, updateFilters };
}

export { usePaginate };
export type { PaginationParams, PaginationDefault };

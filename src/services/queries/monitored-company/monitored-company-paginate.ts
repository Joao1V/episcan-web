'use client';

import type { MonitoredCompany } from '@/services/queries/monitored-company/types';
import { QUERY_KEYS } from '@/services/queries/queryKeys';

import type { PaginateResponse, ResponsePaginate } from '@/libs/axios/types';

import { useGetData } from '@/hooks';
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

interface Options {
   enabled?: boolean;
}

export function useMonitoredCompanyPaginate(options?: Options) {
   const queryClient = useQueryClient();
   const params = useParams();

   const { data, refetch, isFetching } = useGetData<
      ResponsePaginate<MonitoredCompany[]>,
      PaginateResponse<MonitoredCompany>
   >({
      queryKey: [QUERY_KEYS.MONITORED_COMPANIES.PAGINATE],
      url: 'restrict/monitored-company/paginate',
      onSuccess: async (response) => {
         return response.object;
      },
      enabled: options?.enabled || false,
   });


   return {
      data,
      refetch,
   };
}

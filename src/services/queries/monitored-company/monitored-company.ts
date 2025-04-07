'use client';

import { useEffect } from 'react';

import { useParams } from 'next/navigation';

import { useQuery, useQueryClient } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/services/queries/queryKeys';

import type { ResponsePaginate } from '@/libs/axios/types';
import type { MonitoredCompany } from './types';

type MonitoredCompanyReturn = {
   data: MonitoredCompany | null;
};

export function useMonitoredCompany(): MonitoredCompanyReturn {
   const queryClient = useQueryClient();
   const params = useParams();

   const queryState = queryClient.getQueryState<ResponsePaginate<MonitoredCompany[]>>([
      QUERY_KEYS.MONITORED_COMPANIES.PAGINATE,
   ]);

   const monitoredCompanyActive =
      queryState?.data?.data.find(
         (item) => item.identifier === params.monitored_company_identifier,
      ) || null;

   const { data } = useQuery({
      queryKey: [QUERY_KEYS.MONITORED_COMPANIES.ACTIVE, params.monitored_company_identifier],
      queryFn: () => {
         return monitoredCompanyActive;
      },
      initialData: monitoredCompanyActive,
   });

   useEffect(() => {
      const isFetching = queryClient.isFetching({
         queryKey: [QUERY_KEYS.MONITORED_COMPANIES.ACTIVE, params.monitored_company_identifier],
      });

      if (queryState?.fetchStatus === 'idle' && !isFetching) {
         queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.MONITORED_COMPANIES.ACTIVE, params.monitored_company_identifier],
         });
      }
   }, [queryState?.fetchStatus]);

   return { data };
}

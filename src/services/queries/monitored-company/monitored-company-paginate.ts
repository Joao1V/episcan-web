'use client';

import { useGetData } from '@/hooks';
import { QUERY_KEYS } from '@/services/queries/queryKeys';
export function useMonitoredCompanyPaginate() {

   return useGetData({
      queryKey: [QUERY_KEYS.COMPANIES_PAGINATE],
      url: 'restrict/monitored-company/paginate',
      onSuccess: (response) => {
         return response.object;
      },
   });
}

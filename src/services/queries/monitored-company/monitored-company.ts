import { useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/services/queries/queryKeys';


export function useMonitoredCompany() {
   const queryClient = useQueryClient();
   const dataCache: any = queryClient.getQueryData([QUERY_KEYS.COMPANIES_PAGINATE]) || {};

   const { data } = useQuery({
      queryKey: [QUERY_KEYS.ACTIVE_COMPANY],
      initialData: dataCache?.data?.length > 0 ? dataCache.data[0] : {},
      enabled: false,
   });

   return { data };
}
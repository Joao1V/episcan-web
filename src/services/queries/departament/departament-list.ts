import { QUERY_KEYS } from '@/services/queries/queryKeys';
import { useGetData } from '@/hooks';


export function useDepartmentList(identifier: string | undefined) {

   return useGetData({
      queryKey: [QUERY_KEYS.MONITORED_COMPANIES.DEPARTMENTS, identifier],
      enabled: !!identifier,
      url: `restrict/monitored-company/${identifier}/department/tree`,
      onSuccess: (response) => {
         return response.object;
      },
   });

}
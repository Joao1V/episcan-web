import { QUERY_KEYS } from '@/services/queries/queryKeys';
import { useGetData } from '@/hooks';


export function useDepartmentList(identifier: string) {

   return useGetData({
      queryKey: [QUERY_KEYS.DEPARTMENT_COMPANY_PAGINATE(identifier)],
      url: `restrict/monitored-company/${identifier}/department/tree`,
      onSuccess: (response) => {
         return response.object;
      },
   });

}
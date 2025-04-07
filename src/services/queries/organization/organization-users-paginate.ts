import { useGetData } from '@/hooks';
import { QUERY_KEYS } from '@/services/queries/queryKeys';

export function useOrganizationUsersPaginate(identifier: string) {

   return useGetData({
      queryKey: [QUERY_KEYS.ORGANIZATION.USERS_PAGINATE, identifier],
      url: `restrict/organization/${identifier}/customer/paginate`,
      // params: initialParams,
      onSuccess: (response) => {
         return response.object;
      },
   });

}
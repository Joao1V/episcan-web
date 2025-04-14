import { OrganizationUsers } from '@/services/queries/organization/types';
import { QUERY_KEYS } from '@/services/queries/queryKeys';

import { ResponsePaginate } from '@/libs/axios/types';

import { useGetData } from '@/hooks';

export function useOrganizationUsersPaginate(identifier: string) {
   const { data, refetch } = useGetData<ResponsePaginate<OrganizationUsers[]>>({
      queryKey: [QUERY_KEYS.ORGANIZATION.USERS_PAGINATE, identifier],
      url: `restrict/organization/${identifier}/customer/paginate`,
      // params: initialParams,
      onSuccess: (response) => {
         return response.object;
      },
   });

   return { data, refetch };
}
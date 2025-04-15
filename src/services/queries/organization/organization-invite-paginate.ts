import { OrganizationInviteUsers } from '@/services/queries/organization/types';
import { QUERY_KEYS } from '@/services/queries/queryKeys';

import { PaginateResponse, ResponsePaginate } from '@/libs/axios/types';

import { useGetData } from '@/hooks';

type Options = {
   enabled: boolean;
};
export function useOrganizationInvitePaginate(options?: Options) {
   const { data, refetch, isEmptyData, isLoading, isFetching } = useGetData<
      ResponsePaginate<OrganizationInviteUsers[]>,
      PaginateResponse<OrganizationInviteUsers[]>
   >({
      queryKey: [QUERY_KEYS.ORGANIZATION.INVITE_USERS_PAGINATE],
      url: '/restrict/organization-invite/paginate',
      onSuccess: (response) => {
         return response.object;
      },
      enabled: options?.enabled,
   });

   return { data, refetch, isEmptyData, isLoading, isFetching };
}

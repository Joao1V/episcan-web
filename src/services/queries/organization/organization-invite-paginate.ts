import { useGetData } from '@/hooks';
import { QUERY_KEYS } from '@/services/queries/queryKeys';


type Options = {
   enabled: boolean,
}
export function useOrganizationInvitePaginate(options?: Options) {

   return useGetData({
      queryKey: [QUERY_KEYS.ORGANIZATION.INVITE_USERS_PAGINATE],
      url: '/restrict/organization-invite/paginate',
      onSuccess: (response) => {
         return response.object;
      },
      enabled: options?.enabled
   });

}
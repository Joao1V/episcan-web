import { useGetData } from '@/hooks';
import { QUERY_KEYS } from '@/services/queries/queryKeys';

type Options = {
   enabled: boolean,
}
export function useOrganizationPaginate(options?: Options) {

   return useGetData({
      queryKey: [QUERY_KEYS.ORGANIZATION_PAGINATE],
      url: 'restrict/organization/paginate',
      onSuccess: (response) => {
         return response.object;
      },
      enabled: options?.enabled
   });

}
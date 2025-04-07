import { useGetData } from '@/hooks';
import { QUERY_KEYS } from '@/services/queries/queryKeys';
import { PaginateResponse, ResponsePaginate } from '@/libs/axios/types';
import { Organization } from '@/services/queries/organization/types';

type Options = {
   enabled: boolean,
}
export function useOrganizationPaginate(options?: Options) {

   return useGetData<ResponsePaginate<Organization[]>, PaginateResponse<Organization[]>>({
      queryKey: [QUERY_KEYS.ORGANIZATION.PAGINATE],
      url: 'restrict/organization/paginate',
      onSuccess: (response) => {
         return response.object;
      },
      enabled: options?.enabled
   });

}
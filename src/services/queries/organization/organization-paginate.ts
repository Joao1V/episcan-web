import { useGetData } from '@/hooks';
import { QUERY_KEYS } from '@/services/queries/queryKeys';
import { PaginateResponse, ResponsePaginate } from '@/libs/axios/types';
import { Organization } from '@/services/queries/organization/types';
import { useQueryClient } from '@tanstack/react-query';

type Options = {
   enabled: boolean,
}
export function useOrganizationPaginate(options?: Options) {
   const queryClient = useQueryClient();

   const { data, refetch: _refetch } = useGetData<ResponsePaginate<Organization[]>, PaginateResponse<Organization[]>>({
      queryKey: [QUERY_KEYS.ORGANIZATION.PAGINATE],
      url: 'restrict/organization/paginate',
      onSuccess: (response) => {
         return response.object;
      },
      enabled: options?.enabled
   });

   const refetch = async () => {
      await _refetch();
      await queryClient.refetchQueries({ queryKey: [QUERY_KEYS.ORGANIZATION.ACTIVE] });
   };

   return { data, refetch };
}
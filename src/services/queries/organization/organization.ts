'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';

import type { Organization } from '@/services/queries/organization/types';
import { QUERY_KEYS } from '@/services/queries/queryKeys';

import type { ResponsePaginate } from '@/libs/axios/types';

type OrganizationReturn = {
   data: Organization | undefined;
   refetch: () => Promise<void>;
};
export function useOrganization(): OrganizationReturn {
   const queryClient = useQueryClient();

   const organizationPaginate =
      queryClient.getQueryData<ResponsePaginate<Organization[]>>([
         QUERY_KEYS.ORGANIZATION.PAGINATE,
      ]) || undefined;

   const organizationActive =
      organizationPaginate?.data && organizationPaginate.data.length > 0 ?
         organizationPaginate.data[0]
      :  undefined;

   const { data, refetch: _refetch } = useQuery({
      queryKey: [QUERY_KEYS.ORGANIZATION.ACTIVE],
      queryFn: () => organizationActive,
      initialData: organizationActive,
      enabled: false,
   });

   const refetch = async () => {
      await queryClient.refetchQueries({ queryKey: [QUERY_KEYS.ORGANIZATION.PAGINATE] });
      await _refetch();
   };

   return { data, refetch };
}

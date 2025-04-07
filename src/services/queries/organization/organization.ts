'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';

import type { ResponsePaginate } from '@/libs/axios/types';
import { Organization } from '@/services/queries/organization/types';
import { QUERY_KEYS } from '@/services/queries/queryKeys';

type OrganizationReturn = {
   data: Organization | null;
   refreshData: () => Promise<void>;
};
export function useOrganization(): OrganizationReturn {
   const queryClient = useQueryClient();

   const organizationPaginate =
      queryClient.getQueryData<ResponsePaginate<Organization[]>>([
         QUERY_KEYS.ORGANIZATION.PAGINATE,
      ]) || null;

   const organizationActive =
      organizationPaginate?.data && organizationPaginate.data.length > 0 ?
         organizationPaginate.data[0]
      :  null;

   const { data, refetch } = useQuery({
      queryKey: [QUERY_KEYS.ORGANIZATION.ACTIVE],
      queryFn: () => organizationActive,
      initialData: organizationActive,
      enabled: false,
   });

   const refreshData = async () => {
      await queryClient.refetchQueries({ queryKey: [QUERY_KEYS.ORGANIZATION.PAGINATE] });
      await refetch();
   };

   return { data, refreshData };
}

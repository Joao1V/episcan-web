'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/services/queries/queryKeys';

export function useOrganization(): { [key: string]: any } {
   const queryClient = useQueryClient();
   const organizationList: any = queryClient.getQueryData([QUERY_KEYS.ORGANIZATION_PAGINATE]) || {};
   // queryClient.setQueryData(['active-organization'], () => organizationList?.data?.length > 0 ? organizationList.data[0] : {});
   // const data = queryClient.getQueryData(['active-organization']);
   const { data } = useQuery({
      queryKey: [QUERY_KEYS.ACTIVE_ORGANIZATION],
      queryFn: () => organizationList?.data?.length > 0 ? organizationList.data[0] : {},
      initialData: organizationList?.data?.length > 0 ? organizationList.data[0] : {},
      enabled: false,
   });

   return { data };
}

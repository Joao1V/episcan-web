'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/services/queries/queryKeys';

export function useOrganization(): { [key: string]: any } {
   const queryClient = useQueryClient();
   const organizationList: any = queryClient.getQueryData([QUERY_KEYS.ORGANIZATION_PAGINATE]) || {};
   // queryClient.setQueryData(['active-organization'], () => organizationList?.data?.length > 0 ? organizationList.data[0] : {});
   // const data = queryClient.getQueryData(['active-organization']);
   const { data } = useQuery({
      queryKey: ['active-organization'],
      initialData: organizationList?.data?.length > 0 ? organizationList.data[0] : {},
   });

   return { data };
}

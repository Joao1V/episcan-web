import React, { cache } from 'react';

import api from 'api';

import { PanelLayout } from '@/features/(panel)/_layout/panel-layout';

import type { MonitoredCompany } from '@/services/queries/monitored-company/types';
import type { Organization } from '@/services/queries/organization/types';
import { QUERY_KEYS } from '@/services/queries/queryKeys';

import type { PaginateResponse } from '@/libs/axios/types';
import ServerHydration from '@/libs/server-hydration-teste';

const getMonitoredCompany = cache(async () => {
   console.log('🔍 [Fetching]');

   const organization = await api.get<PaginateResponse<Organization[]>>(
      'restrict/organization/paginate',
      {
         page: 1,
         limit: 50,
         order_field: 'created_at',
         order_type: 'DESC',
      },
   );
   const company = await api.get<PaginateResponse<MonitoredCompany[]>>(
      'restrict/monitored-company/paginate',
      {
         page: 1,
         limit: 50,
         order_field: 'created_at',
         order_type: 'DESC',
      },
   );
   console.log('🔍 [Fetched]');

   return [organization, company] as const;
});

export default async function Layout(props: {
   children: React.ReactNode;
}) {
   const { children } = props;
   const [organization, monitoredCompany] = await getMonitoredCompany();

   return (
      <ServerHydration
         initialData={[
            {
               queryKey: [QUERY_KEYS.ORGANIZATION.PAGINATE],
               data: organization,
               url: 'restrict/organization/paginate',
            },
            {
               queryKey: [QUERY_KEYS.MONITORED_COMPANIES.PAGINATE],
               data: monitoredCompany,
               url: 'restrict/monitored-company/paginate',
            },
         ]}
      >
         <PanelLayout>{children}</PanelLayout>
      </ServerHydration>
   );
}

import { ReactNode } from 'react';

import { PanelLayout } from '@/features/(panel)/_layout/panel-layout';
import api from 'api';
import ServerHydration from 'server-hydration';
import { ComponentCompanyProfile } from '@/features/(panel)/component-company-profile';
import { QUERY_KEYS } from '@/services/queries/queryKeys';
import { auth } from '@/app/(backend)/api/auth';

export default async function Layout({ children }: { children: ReactNode }) {

   const session = await auth();

   if (session?.user?.organization_invites?.length > 0) {
      return (
         <PanelLayout>
            {children}
         </PanelLayout>
      );
   }

   const dataOrganizationPaginate: any = await api.get('restrict/organization/paginate', {
      page: 1,
      limit: 50,
      order_field: 'created_at',
      order_type: 'DESC',
   });

   const dataMonitoredCompanyPaginate: any = await api.get('restrict/monitored-company/paginate', {
      page: 1,
      limit: 50,
      order_field: 'created_at',
      order_type: 'DESC',
   });

   return (

      <ServerHydration
            initialData={[
               {
                  queryKey: [QUERY_KEYS.ORGANIZATION_PAGINATE],
                  data: dataOrganizationPaginate?.object,
               },
               {
                  queryKey: [QUERY_KEYS.COMPANIES_PAGINATE],
                  data: dataMonitoredCompanyPaginate?.object,
               },
            ]}
      >
         <PanelLayout>
            <div className="col-sm-12 mb-5 mb-xl-10">
               <ComponentCompanyProfile />
            </div>
            {children}
         </PanelLayout>
      </ServerHydration>
   );
}

import api from 'api';
import ServerHydration from 'server-hydration';

import { PanelLayout } from '@/features/(panel)/_layout/panel-layout';
import { ComponentCompanyProfile } from '@/features/(panel)/component-company-profile';
import { getQueryParams } from '@/libs/helpers/server-functions';
import { QUERY_KEYS } from '@/services/queries/queryKeys';

export default async function Layout(props: any) {
   const { children } = props;
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

   try {
      const params = await getQueryParams();
      console.log(params);
      if (params.pathname === '/painel/dashboard') {
      }
   } catch (e) {
      console.log('deu alguma merda', e);
   }

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

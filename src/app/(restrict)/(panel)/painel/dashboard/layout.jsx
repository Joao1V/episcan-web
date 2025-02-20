import { QUERY_KEYS } from '@/services/queries/queryKeys';
import api from 'api';

export default async function Layout(props) {
   // const responseSummary = await api.get('');

   return props.children;

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
         {props.children}
      </ServerHydration>
   );
}

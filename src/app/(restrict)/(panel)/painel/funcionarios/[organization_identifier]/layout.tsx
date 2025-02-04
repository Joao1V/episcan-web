import ServerHydration from 'server-hydration';
import api from 'api';
import { getQueryParams } from '@/libs/helpers/server-functions';
import { QUERY_KEYS } from '@/services/queries/queryKeys';

export default async function Layout(props: any) {
   const { children, params } = props;
     const identifier = (await params).organization_identifier;

  const url = await getQueryParams();
   const dataUsersPaginate: any = await api.get(`restrict/organization/${identifier}/customer/paginate`, {
      page: 1,
      limit: 50,
      order_field: 'created_at',
      order_type: 'DESC',
   });

   return (

      <ServerHydration initialData={{
         queryKey: [QUERY_KEYS.ORGANIZATION_USERS_PAGINATE(identifier)],
         data: dataUsersPaginate?.object
      }}>
         {children}
      </ServerHydration>
   );
}

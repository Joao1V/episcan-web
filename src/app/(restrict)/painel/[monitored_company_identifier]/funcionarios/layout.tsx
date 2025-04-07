import type { Metadata } from 'next';

import api from 'api';
import ServerHydration from 'server-hydration';

import { COOKIES_KEYS, QUERY_KEYS } from '@/services/queries/queryKeys';

import { Cookies } from '@/libs/helpers/server-functions';

export const metadata: Metadata = {
   title: 'Funcionários',
};
export default async function Layout(props: any) {
   const { children } = props;

   const params = await Cookies.get(COOKIES_KEYS.ORGANIZATION.ACTIVE);
   const dataUsersPaginate = await api.get(
      `restrict/organization/${params.organization.identifier}/customer/paginate`,
      {
         page: 1,
         limit: 50,
         order_field: 'created_at',
         order_type: 'DESC',
      },
   );

   return (
      <ServerHydration
         initialData={{
            queryKey: [QUERY_KEYS.ORGANIZATION.USERS_PAGINATE, params.organization.identifier],
            data: dataUsersPaginate?.object,
         }}
      >
         {children}
      </ServerHydration>
   );
}

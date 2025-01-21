import api from 'api';

import CreateOrganization from '@/app/painel/create-organization';

export default async function Page() {
   try {
      const res = await api.get(
         'restrict/organization/paginate?page=1&limit=50&order_field=created_at&order_type=DESC',
      );
      console.log(res);
   } catch (e) {
      console.log(e);
   }
   return (
      <div>
         <div className={'container'}>
            <CreateOrganization />
         </div>
         {/*<pre*/}
         {/*   style={{*/}
         {/*      whiteSpace: 'pre-wrap',*/}
         {/*      wordWrap: 'break-word',*/}
         {/*      maxHeight: '400px',*/}
         {/*      overflow: 'auto',*/}
         {/*   }}*/}
         {/*>*/}
         {/*   {JSON.stringify(data, null, 2)}*/}
         {/*</pre>*/}
      </div>
   );
}

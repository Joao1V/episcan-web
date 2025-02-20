import api from 'api';
import FormBuilder from 'form-builder';

import { useMonitoredCompany } from '@/services/queries/monitored-company';
import { useOrganization, useOrganizationUsersPaginate } from '@/services/queries/organization';
import { QUERY_KEYS } from '@/services/queries/queryKeys';

export function FormAddNewSector(props) {
   const { data: organization } = useOrganization();
   const { data: monitoredCompany } = useMonitoredCompany();

   const { data: organizationUsers } = useOrganizationUsersPaginate(organization.identifier);
   const onSubmit = async (payload) => {
      try {
         const response = await api.post(
            `/restrict/monitored-company/${monitoredCompany.identifier}/department`,
            payload,
         );
         if (props.onSuccess) await props.onSuccess();
      } catch (e) {}
   };
   return (
      <FormBuilder
         onSubmit={onSubmit}
         defaultValues={{
            active: true,
            visible: true,
            attach: false,
            sorting: 1,
         }}
         config={{
            col: 'col-12',
            fields: [
               {
                  type: 'text',
                  accessor: 'title',
                  label: 'Nome do setor',
                  placeholder: 'Digite aqui...',
               },
               {
                  type: 'select',
                  accessor: 'manager_customer_identifier',
                  options: organizationUsers?.data || null,
                  label: 'Responsável pelo setor',
                  keys: ['name', 'identifier'],
               },
               {
                  type: 'submit',
                  text: 'Criar setor',
               },
            ],
         }}
      />
   );
}

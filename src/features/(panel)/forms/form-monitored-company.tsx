'use client';

import { useRouter } from 'next/navigation';

import FormAddress from '@components/FormAddress';
import { useMutation } from '@tanstack/react-query';
import api from 'api';
import FormBuilder, { useFormBuilder } from 'form-builder';
import * as yup from 'yup';

import {
   useMonitoredCompany,
   useMonitoredCompanyPaginate,
} from '@/services/queries/monitored-company';
import { useOrganization } from '@/services/queries/organization';

type FormProps = {
   mode: 'create' | 'edit';
};
export function FormMonitoredCompany(props: FormProps) {
   const { mode = 'create' } = props;

   const form = useFormBuilder(['data_company', 'address']);
   const router = useRouter();
   const { data: organization } = useOrganization();
   const { data: monitoredCompany } = useMonitoredCompany();
   const { refetch: refetchMonitoredCompanyPaginate, data } = useMonitoredCompanyPaginate({ enabled: false });

   const onSubmit = async () => {
      try {
         const { isValidForm, payload } = await form.validateForms();
         if (isValidForm) {
            if (mode === 'create') {
               await api.post('/restrict/monitored-company', payload);
               router.replace('/painel/setor');
            } else {
               const response = await api.put(
                  `/restrict/monitored-company/${payload.identifier}`,
                  payload,
               );
            }
            await refetchMonitoredCompanyPaginate();

         }
      } catch (e: any) {
         form.validator(e);
      }
   };

   const { isPending, mutate } = useMutation({
      mutationFn: onSubmit,
   });

   return (
      <div>
         <div>
            <FormBuilder
               id={'data_company'}
               onFetchData={{
                  fn: () => {
                     return {
                        cpfcnpj: monitoredCompany?.cpfcnpj,
                        person_type: monitoredCompany?.person_type,
                        name: monitoredCompany?.name,
                        juridical_fancy_name: monitoredCompany?.juridical_fancy_name,
                        contact_mail: monitoredCompany?.contact_mail,
                        contact_business_phone: monitoredCompany?.contact_business_phone,
                        contact_mobile_phone: monitoredCompany?.contact_mobile_phone,
                        contact_website: monitoredCompany?.contact_website,
                        address_cep: monitoredCompany?.address_cep,
                        address_city_id: monitoredCompany?.address_city_id,
                        address_street: monitoredCompany?.address_street,
                        address_number: monitoredCompany?.address_number,
                        address_complement: monitoredCompany?.address_complement,
                        address_district: monitoredCompany?.address_district,
                        scan_epi: monitoredCompany?.scan_epi,
                        note: monitoredCompany?.note,
                     };
                  },
                  enabled: mode === 'edit',
               }}
               defaultValues={
                  mode === 'create' ?
                     {
                        organization_identifier: organization.identifier,
                        person_type: 'JURIDICA',
                     }
                  :  {
                        identifier: monitoredCompany?.identifier,
                        person_type: monitoredCompany?.person_type,
                     }
               }
               config={{
                  fields: [
                     {
                        type: 'text',
                        accessor: 'name',
                        label: 'Nome da Empresa',
                        rule: yup.string().required('Nome da empresa é obrigátorio'),
                     },
                     {
                        type: 'text',
                        accessor: 'juridical_fancy_name',
                        disabled: mode === 'edit',
                        label: 'Razão Social',
                     },
                     {
                        type: 'cnpj',
                        accessor: 'cpfcnpj',
                        disabled: mode === 'edit',
                        label: 'CNPJ',
                     },
                     {
                        type: 'email',
                        accessor: 'contact_mail',
                        label: 'Email',
                        rule: yup.string().email().required('Rua é obrigatória'),
                     },
                     {
                        type: 'phone-input',
                        accessor: 'contact_mobile_phone',
                        label: 'Contato da Empresa',
                     },
                     {
                        type: 'radio',
                        accessor: 'scan_epi',
                        col: 'col-12',
                        label: 'Funcionar as câmeras dessas empresa?',
                        options: [
                           {
                              label: 'Sim',
                              value: true,
                           },
                           {
                              label: 'Não',
                              value: false,
                           },
                        ],
                     },
                  ],
               }}
            />
         </div>

         <div className={'mt-10'}>
            <h4>Endereço</h4>
            <FormAddress
               nameFields={{
                  cep: 'address_cep',
                  street_name: 'address_street',
                  street_number: 'address_number',
                  district: 'address_district',
                  city_id: 'address_city_id',
                  complement: 'address_complement',
               }}
               defaultValue={
                  (mode === 'edit' && monitoredCompany) ?
                     {
                        cep: monitoredCompany.address_cep,
                        street_name: monitoredCompany.address_street,
                        street_number: monitoredCompany.address_number,
                        district: monitoredCompany.address_district,
                        city: monitoredCompany.city_name,
                        // city_id: monitoredCompany.address_city_id,
                        state: monitoredCompany.state_uf,
                        complement: monitoredCompany.address_complement,
                     }
                  :  undefined
               }
            />
         </div>
         <div className={'mt-5 d-flex justify-content-end'}>
            <button
               className={'btn btn-primary'}
               disabled={isPending || form?.['data_company']?.isSubmitting}
               onClick={() => mutate()}
            >
               {mode === 'edit' ? 'Editar empresa' : 'Criar empresa'}
            </button>
         </div>
      </div>
   );
}

'use client';

import FormBuilder, { useFormBuilder } from 'form-builder';
import * as yup from 'yup';
import FormAddress from '@components/FormAddress';
import api from 'api';
import { useMutation } from '@tanstack/react-query';
import { useOrganization } from '@/services/queries/organization';

export function FormCreateMonitoredCompany() {
   const form = useFormBuilder(['data_company', 'address']);

   const onSubmit = async () => {
      try {
         const { isValidForm, payload } = await form.validateForms();
         if (isValidForm) {
            const response = await api.post('/restrict/monitored-company', payload);
            console.log(response);
         }
      } catch (e: any) {
         form.validator(e);
      }
   };

   const { isPending, mutate } = useMutation({
      mutationFn: onSubmit,
   });

   const { data: organization } = useOrganization();
   return (
      <div>

         <div>
            <h4>Criando uma empresa para a organização: <span className={'text-uppercase'}>{organization?.name}</span>
            </h4>

            <FormBuilder
               id={'data_company'}
               defaultValues={{
                  organization_identifier: organization.identifier,
                  person_type: 'JURIDICA'
               }}
               config={{
                  fields: [
                     {
                        type: 'text',
                        accessor: 'name',
                        label: 'Nome da Empresa',
                        rule: yup.string().required('Rua é obrigatória')
                     },
                     {
                        type: 'text',
                        accessor: 'juridical_fancy_name',
                        label: 'Razão Social'
                     },
                     {
                        type: 'cnpj',
                        accessor: 'cpfcnpj',
                        label: 'CNPJ'
                     },
                     {
                        type: 'email',
                        accessor: 'contact_mail',
                        label: 'Email',
                        rule: yup.string().email().required('Rua é obrigatória')
                     },
                     {
                        type: 'phone-input',
                        accessor: 'contact_mobile_phone',
                        label: 'Contato da Empresa'
                     },
                     {
                        type: 'radio',
                        accessor: 'scan_epi',
                        col: 'col-12',
                        label: 'Funcionar as cameras desas empresa?',
                        options: [
                           {
                              label: 'Sim',
                              value: true,
                           },
                           {
                              label: 'Não',
                              value: false,
                           }
                        ],
                     }
                  ]
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
            />
         </div>
         <div className={'mt-5 d-flex justify-content-end'}>
            <button
               className={'btn btn-primary'}
               disabled={isPending || form?.['data_company']?.isSubmitting}
               onClick={() => mutate()}
            >
               Criar empresa
            </button>
         </div>
      </div>
   );
}

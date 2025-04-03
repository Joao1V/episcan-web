'use client';

import { useRouter } from 'next/navigation';

import FormAddress from '@components/FormAddress';
import { useMutation } from '@tanstack/react-query';
import api from 'api';
import FormBuilder, { useFormBuilder } from 'form-builder';
import * as yup from 'yup';

export default function FormCreateOrganization() {
   const form = useFormBuilder(['address', 'data_company']);
   const router = useRouter();
   const onSubmit = async () => {
      try {
         const { isValidForm, payload } = await form.validateForms();
         if (isValidForm) {
            await api.post('/restrict/organization', payload);
            router.replace('/painel/criar/empresa');
         }
      } catch (error: any) {
         form.validator(error);
      }
   };

   const { isPending, mutate } = useMutation({
      mutationFn: onSubmit,
   });

   return (
      <>
         <div>
            <FormBuilder
               id={'data_company'}
               defaultValues={{
                  person_type: 'JURIDICA',
                  active: true,
               }}
               config={{
                  fields: [
                     {
                        type: 'text',
                        accessor: 'name',
                        label: 'Nome da Empresa',
                        rule: yup.string().required('Nome é obrigatória'),
                     },
                     {
                        type: 'text',
                        accessor: 'juridical_fancy_name',
                        label: 'Razão Social',
                     },
                     {
                        type: 'cnpj',
                        accessor: 'cpfcnpj',
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
                        placeholder: 'Contato da Empresa',
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
            />
         </div>

         <div className={'mt-5 d-flex justify-content-end'}>
            <button
               className={'btn btn-primary'}
               disabled={isPending || form?.['data_company']?.isSubmitting}
               onClick={() => mutate()}
            >
               Criar organização
            </button>
         </div>
      </>
   );
}

'use client';

import React, { useMemo, useState } from 'react';

import api from 'api';
import FormBuilder, { useFormBuilder } from 'form-builder';
import * as yup from 'yup';

export const fieldsFormAddress = {
   street_name: 'street_name',
   street_number: 'street_number',
   cep: 'cep',
   district: 'district',
   city: 'city',
   state: 'state',
   complement: 'complement',
   city_id: 'city_id',
};

interface FormAddressProps {
   onSubmit?: (data: any) => void;
   nameFields?: Partial<typeof fieldsFormAddress>;
   defaultValue?: Partial<typeof fieldsFormAddress>;
   hideSubmitButton?: boolean;
   id?: string;
   ref?: React.ForwardedRef<any>;
}

const FormAddress = (props: FormAddressProps) => {
   const [isFetching, setIsFetching] = useState(false);
   const idForm = props?.id || 'address';
   const { reset, setFocus } = useFormBuilder(props?.id || idForm);

   const capitalize = (e: string) => {
      return e.toUpperCase();
   };
   const checkCEP = async (cep: string) => {
      setIsFetching(true);

      try {
         let res: { object: Record<string, any> } = await api.get(`/public/search/cep/${cep}`, {});

         const { object } = res;

         let aux = {
            [fieldNames.street_name]: capitalize(object?.street),
            [fieldNames.district]: capitalize(object?.district),
            [fieldNames.city]: capitalize(object?.city_name),
            [fieldNames.state]: object?.state_uf,
            [fieldNames.cep]: cep,
            [fieldNames.city_id]: object?.city_id,
         };
         reset(aux);
         setTimeout(() => setFocus(fieldNames.street_number), 200);
      } catch (e) {
      } finally {
         setIsFetching(false);
      }
   };

   const fieldNames = useMemo(
      () => ({
         ...fieldsFormAddress,
         ...props.nameFields,
      }),
      [props.nameFields],
   );

   return (
      <FormBuilder
         id={idForm}
         onSubmit={props.onSubmit}
         defaultValues={{
            address_street: 'PORTO FELIZ ',
            address_district: 'VILA SÃO JORGE DA LAGOA',
            city: 'CAMPO GRANDE',
            state: 'MS',
            address_cep: '79095020',
            address_city_id: 1506,
            address_number: '123',
         }}
         config={{
            fields: [
               {
                  type: 'number-format',
                  accessor: fieldNames.cep,
                  label: 'CEP',
                  col: 'col-12',
                  onChange: async ({ value }) => {
                     if (value.length === 8) {
                        await checkCEP(value);
                     }
                  },
                  format: '##.###-###',
                  rule: yup
                     .string()
                     .required('CEP é obrigatório')
                     .length(8, 'CEP deve ter 8 dígitos'),
                  loading: {
                     isFetching,
                  },
               },
               {
                  type: 'text',
                  accessor: fieldNames.street_name,
                  col: 'col-12 col-md-8',
                  label: 'Rua',
                  rule: yup.string().required('Rua é obrigatória'),
                  loading: {
                     isFetching,
                  },
               },
               {
                  type: 'number',
                  accessor: fieldNames.street_number,
                  col: 'col-12 col-md-4 ',
                  label: 'Número',
                  rule: yup.string().required('Rua é obrigatória'),
                  disabled: isFetching,
               },
               {
                  type: 'text',
                  accessor: fieldNames.district,
                  label: 'Bairro',
                  rule: yup.string().required('Bairro é obrigatório'),
                  loading: {
                     isFetching,
                  },
               },
               {
                  type: 'text',
                  accessor: fieldNames.city,
                  label: 'Cidade',
                  col: 'col-12 col-md-6',
                  rule: yup.string().required('Bairro é obrigatório'),
                  loading: {
                     isFetching,
                  },
               },
               {
                  type: 'text',
                  accessor: fieldNames.state,
                  col: 'col-12 col-md-6',
                  label: 'Estado',
                  rule: yup.string().required('Bairro é obrigatório'),
                  loading: {
                     isFetching,
                  },
               },

               {
                  type: 'text',
                  accessor: 'address_complement',
                  label: 'Complemento',
                  disabled: isFetching,
               },
            ],
         }}
      />
   );
};

export default FormAddress;

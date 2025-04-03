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
   defaultValue?: Partial<Record<keyof typeof fieldsFormAddress, string | null | number>>;
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
         defaultValues={
          props?.defaultValue &&
         {
            [fieldNames.street_name]: props.defaultValue?.street_name,
            [fieldNames.district]: props.defaultValue?.district,
            [fieldNames.city]: props.defaultValue?.city,
            [fieldNames.state]: props.defaultValue?.state,
            [fieldNames.cep]: props.defaultValue?.cep,
            [fieldNames.city_id]: props.defaultValue?.city_id,
            [fieldNames.street_number]: props.defaultValue?.street_number,
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
                  placeholder: 'Digite o CEP',
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
                  placeholder: 'Rua',
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
                  placeholder: 'Número',
                  rule: yup.string().required('Rua é obrigatória'),
                  disabled: isFetching,
               },
               {
                  type: 'text',
                  accessor: fieldNames.district,
                  label: 'Bairro',
                  placeholder: 'Bairro',
                  rule: yup.string().required('Bairro é obrigatório'),
                  loading: {
                     isFetching,
                  },
               },
               {
                  type: 'text',
                  accessor: fieldNames.city,
                  label: 'Cidade',
                  placeholder: 'Cidade',
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
                  placeholder: 'Estado',
                  rule: yup.string().required('Bairro é obrigatório'),
                  loading: {
                     isFetching,
                  },
               },

               {
                  type: 'text',
                  accessor: 'address_complement',
                  label: 'Complemento',
                  placeholder: 'Complemento',
                  disabled: isFetching,
               },
            ],
         }}
      />
   );
};

export default FormAddress;

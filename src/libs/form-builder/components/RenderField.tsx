import React, { memo } from 'react';
import { useFormContext } from 'react-hook-form';

import Fields from '@/libs/form-builder/fields';

const RenderField = (props: any) => {
   const { item } = props;

   const {
      formState: { isLoading },
   } = useFormContext();

   switch (item.type) {
      case 'text':
      case 'email':
      case 'login':
      case 'number':
      case 'textarea':
      case 'password':
         if (isLoading) return <div className={'skeleton h-40px'}></div>;
         return <Fields.Input {...item} />;
      case 'number-format':
         if (isLoading) return <div className={'skeleton h-40px'}></div>;
         return <Fields.MaskedInput {...item} />;
      case 'select':
         if (isLoading) return <div className={'skeleton h-40px'}></div>;
         return <Fields.Select {...item} />;
      case 'checkbox':
      case 'radio':
         return <Fields.Radio {...item} />;
      case 'select-file':
         return <Fields.SelectFile {...item} />;
      case 'google-autocomplete':
         return <Fields.Google {...item} />;
      case 'submit':
         return <Fields.ButtonSubmit {...item} />;
      case 'phone-input':
         if (isLoading) return <div className={'skeleton h-40px'}></div>;
         return <Fields.PhoneNumberInput {...item} />;

      //BR FIELDS
      case 'cnpj':
      case 'cpf':
         if (isLoading) return <div className={'skeleton h-40px'}></div>;

         item.format = item.type === 'cnpj' ? '##.###.###/####-##' : '###.###.###-##';

         return <Fields.MaskedInput {...item} />;
      case 'custom':
         return item.render();
      default:
         return null;
   }
};

export default memo(RenderField);

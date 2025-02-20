import React, { memo } from 'react';

import Fields from '@/libs/form-builder/fields';

const RenderField = (props: any) => {
   const { item } = props;

   switch (item.type) {
      case 'text':
      case 'email':
      case 'login':
      case 'number':
      case 'textarea':
      case 'password':
         return <Fields.Input {...item} />;
      case 'number-format':
         return <Fields.MaskedInput {...item} />;
      case 'select':
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
         return <Fields.PhoneNumberInput {...item} />;

      //BR FIELDS
      case 'cnpj':
      case 'cpf':
         item.format = item.type === 'cnpj' ? '##.###.###/####-##' : '###.###.###-##';

         return <Fields.MaskedInput {...item} />;
      case 'custom':
         return item.render();
      default:
         return null;
   }
};

export default memo(RenderField);

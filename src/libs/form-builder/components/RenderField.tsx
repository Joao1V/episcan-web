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
         return <Fields.Select config={item} />;
      case 'radio':
         return <Fields.Radio {...item} />;
      case 'checkbox':
         return <Fields.Checkbox config={item} />;
      case 'select-file':
         return <Fields.SelectFile config={item} />;
      case 'google-autocomplete':
         return <Fields.Google config={item} />;
      case 'submit':
         return <Fields.ButtonSubmit config={item} />;
      case 'phone-input':
         return <Fields.PhoneNumberInput config={item} />;

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

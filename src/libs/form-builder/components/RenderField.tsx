import React, { memo } from 'react';

import Fields from '@/libs/form-builder/fields';

const RenderField = (props: any) => {
   const { item } = props;

   switch (item.type) {
      case 'text':
         return <Fields.Text config={item} />;
      case 'email':
      case 'login':
         return <Fields.Email config={item} />;
      case 'number':
         return <Fields.Number config={item} />;
      case 'password':
         return <Fields.Password config={item} />;
      case 'textarea':
         return <Fields.Textarea config={item} />;
      case 'number-format':
         return <Fields.MaskedInput config={item} />;
      case 'select':
         return <Fields.Select config={item} />;
      case 'radio':
         return <Fields.Radio config={item} />;
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
         return (
            <Fields.MaskedInput
               config={{
                  ...item,
                  format: item.type === 'cnpj' ? '##.###.###/####-##' : '###.###.###-##',
               }}
            />
         );
      case 'custom':
         return item.render();
      default:
         return null;
   }
};

export default memo(RenderField);

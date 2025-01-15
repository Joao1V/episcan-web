import React, { memo, useEffect, useState } from 'react';
import { useController } from 'react-hook-form';
import NumberFormat from 'react-number-format';

import { CommonConfigInput, CommonFieldConfig, FieldDefaultProps } from '../types/fields';

//type login aceita email ou cpf
export type EmailConfig = CommonFieldConfig &
   CommonConfigInput & {
      type: 'email' | 'login';
   };

const InputEmail = (props: FieldDefaultProps<'email'>) => {
   const { placeholder, accessor, type, disabled, addClassName } = props.config;
   const [isCpf, setIsCpf] = useState(false);
   const {
      field,
      fieldState: { error },
   } = useController({ name: accessor });
   const onChange = (value: string) => {
      const firstFour = value.slice(0, 4);
      const testValue = /^\d{4}$/.test(firstFour);

      if (value.length >= 4 && !isCpf && testValue) {
         setIsCpf(true);
      } else if (value.length <= 4 && isCpf) {
         setIsCpf(false);
      }
   };

   useEffect(() => {
      onChange(field.value || '');
   }, [field.value]);

   return (
      <>
         {isCpf ?
            <NumberFormat
               format="###.###.###-##"
               value={field.value}
               onValueChange={(values) => {
                  field.onChange(values.value);
               }}
               autoFocus={true}
               getInputRef={field.ref}
               onBlur={field.onBlur}
               className={`form-control${error ? ' is-invalid' : ''}`}
               placeholder="000.000.000-00"
               id={field.name}
            />
         :  <input
               {...field}
               className={`form-control${error ? ' is-invalid' : ''} ${addClassName || ''}`}
               placeholder={placeholder || ''}
               id={field.name}
               autoFocus={type === 'login' ? true : undefined}
               value={field?.value || ''}
               type={'email'}
               disabled={disabled}
            />
         }
      </>
   );
};

export default memo(InputEmail);

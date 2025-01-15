import React, { memo } from 'react';
import { useController } from 'react-hook-form';

import { CommonConfigInput, CommonFieldConfig, FieldDefaultProps } from '../types/fields';

export type PasswordConfig = CommonFieldConfig &
   CommonConfigInput & {
      type: 'password';
      disabled?: boolean;
      addClassName?: string;
   };
const InputPassword: React.FC<FieldDefaultProps<'password'>> = (props) => {
   const { placeholder, accessor, type, disabled } = props.config;
   const {
      field,
      fieldState: { error },
   } = useController({ name: accessor });

   const { addClassName } = props.config;

   return (
      <input
         {...field}
         className={`form-control ${error ? 'is-invalid' : ''} ${addClassName || ''}`}
         placeholder={placeholder || ''}
         id={field.name}
         value={field?.value || ''}
         type={type}
         disabled={disabled}
      />
   );
};

export default memo(InputPassword);

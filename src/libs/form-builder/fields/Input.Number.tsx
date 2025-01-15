import React, { memo } from 'react';
import { useController } from 'react-hook-form';

import { CommonConfigInput, CommonFieldConfig, FieldDefaultProps } from '../types/fields';

export type NumberConfig = CommonFieldConfig &
   CommonConfigInput & {
      type: 'number';
      isAllowNegative?: boolean;
      minLength?: number;
      maxLength?: number;
   };
const InputNumber: React.FC<FieldDefaultProps<'number'>> = (props) => {
   const { placeholder, accessor, disabled } = props.config;
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
         type={'number'}
         disabled={disabled}
      />
   );
};

export default memo(InputNumber);

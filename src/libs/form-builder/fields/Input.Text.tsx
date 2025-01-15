import React, { memo } from 'react';
import { useController } from 'react-hook-form';

import { CommonConfigInput, CommonFieldConfig, FieldDefaultProps } from '../types/fields';

export type TextConfig = CommonFieldConfig &
   CommonConfigInput & {
      type: 'text';
      maxLength?: number;
   };
const InputText: React.FC<FieldDefaultProps<'text'>> = (props) => {
   const {
      config: { addClassName, maxLength, accessor, disabled, placeholder },
   } = props;

   const {
      field,
      fieldState: { error },
   } = useController({ name: accessor });

   return (
      <input
         {...field}
         className={`form-control ${error ? 'is-invalid' : ''} ${addClassName || ''}`}
         placeholder={placeholder || ''}
         id={field.name}
         value={field?.value || ''}
         type={'text'}
         disabled={disabled}
         maxLength={maxLength}
      />
   );
};

export default memo(InputText);

import React, { memo } from 'react';
import { useController } from 'react-hook-form';

import { CommonFieldConfig, FieldDefaultProps } from '@/libs/form-builder/types/fields';

export type SelectConfig = Omit<CommonFieldConfig, 'label' | 'placeholder'> & {
   type: 'select';
   options: {
      label: string;
      value: string | number;
   }[];
};
const Select = (props: FieldDefaultProps<'select'>) => {
   const { options, accessor } = props.config;

   const {
      field,
      fieldState: { error },
   } = useController({ name: accessor });

   return (
      <select className={'form-select'} {...field}>
         {options.map((option, index: number) => (
            <option key={index} value={option.value}>
               {option.label}
            </option>
         ))}
      </select>
   );
};

export default memo(Select);

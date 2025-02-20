import React, { memo } from 'react';
import { useController } from 'react-hook-form';

import { CommonFieldConfig } from '@/libs/form-builder/types/fields';
import SelectBuilder from 'select-builder';
import { SelectBuilderProps } from '@/libs/select-builder/types';

export type SelectConfig = Omit<CommonFieldConfig, 'placeholder'> & SelectBuilderProps & {
   type: 'select';
   options: {
      label: string;
      value: string | number;
   }[];
};
const Select = (props: SelectConfig) => {
   const { options, accessor } = props;

   const fieldController = useController({ name: accessor });

   return (
      <SelectBuilder fieldController={fieldController} {...props}/>
   )

};

export default memo(Select);

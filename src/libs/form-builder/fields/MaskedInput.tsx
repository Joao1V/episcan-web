import React, { memo } from 'react';
import { useController } from 'react-hook-form';
import NumberFormat from 'react-number-format';

import { CommonFieldConfig, FieldDefaultProps } from '../types/fields';

export type MaskedInputConfig = CommonFieldConfig & {
   format: string;
};
const MaskedInput = (props: FieldDefaultProps<'number-format'>) => {
   const {
      config: { placeholder, accessor, format },
   } = props;

   const {
      field,
      fieldState: { error },
   } = useController({ name: accessor });

   return (
      <NumberFormat
         value={field?.value || ''}
         getInputRef={field.ref}
         id={field.name}
         onValueChange={(e) => field.onChange(e.value)}
         className={`form-control ${error ? 'is-invalid' : ''}`}
         placeholder={placeholder || ''}
         format={format}
      />
   );
};

export default memo(MaskedInput);

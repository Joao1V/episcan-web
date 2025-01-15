import { memo } from 'react';
import { useController } from 'react-hook-form';

import { CommonFieldConfig } from '@/libs/form-builder/types/fields';

export type TextareaConfig = CommonFieldConfig & {
   type: 'textarea';
};
const Textarea = (props: any) => {
   const {
      config: { resize, placeholder },
      accessor,
   } = props;

   const {
      field,
      fieldState: { error },
   } = useController({ name: accessor });

   return (
      <textarea
         {...field}
         className={`form-control ${error ? 'is-invalid' : ''} ${resize ? '' : 'resize-none'}`}
         placeholder={placeholder || ''}
         rows={5}
         id={field.name}
         value={field?.value || ''}
      ></textarea>
   );
};

export default memo(Textarea);

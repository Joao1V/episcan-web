import React, { memo } from 'react';
import { useController } from 'react-hook-form';

import { CommonFieldConfig, FieldDefaultProps } from '../types/fields';

export type CheckboxConfig = CommonFieldConfig & {
   type: 'checkbox';
   text: string;
};
const Checkbox: React.FC<FieldDefaultProps<'checkbox'>> = (props) => {
   const { accessor, text } = props.config;

   const {
      field,
      fieldState: { error },
   } = useController({ name: accessor });

   return (
      <div className={'form-check '}>
         <input
            className="form-check-input"
            type="checkbox"
            {...field}
            checked={field.value}
            id={`checkbox_${accessor}`}
         />
         <label className="form-check-label" htmlFor={`checkbox_${accessor}`}>
            {text}
         </label>
      </div>
   );
};
export default memo(Checkbox);

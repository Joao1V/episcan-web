import React, { memo } from 'react';
import { useController } from 'react-hook-form';

import { CommonFieldConfig } from '../types/fields';

type Options = {
   label: string;
   value: any;
   colClass?: string;
};

export type CheckboxConfig = CommonFieldConfig & {
   text: string;
   options: Options[];
   isDashedStyle: boolean;
};
const Checkbox: React.FC<CheckboxConfig> = (props) => {
   const { accessor, text } = props;

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

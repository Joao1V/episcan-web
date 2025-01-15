import { memo } from 'react';
import { useController } from 'react-hook-form';

import { CommonFieldConfig } from '@/libs/form-builder/types/fields';

export type RadioConfig = CommonFieldConfig & {
   type: 'radio';
   options: {
      label: string;
      value: number | string;
   }[];
};
const Radio = (props: any) => {
   const {
      config: { options, rowClass, onChange },
      accessor,
   } = props;

   const {
      field,
      fieldState: { error },
   } = useController({ name: accessor });

   if (options?.length > 0)
      return (
         <div className={`row ${rowClass || 'row-cols-auto mb-2 g-2'}`}>
            {options.map(
               (
                  option: { label: string; value: string | number; colClass?: string },
                  index: number,
               ) => {
                  let isActive = field.value === option.value;
                  return (
                     <div className={option.colClass || 'col'} key={index}>
                        <label
                           className={`btn btn-outline btn-outline-dashed btn-sm btn-active-light-primary w-100 ${
                              isActive ? 'active' : ''
                           } ${error ? 'border-danger ' : ''}`}
                        >
                           <input
                              type="radio"
                              className="btn-check"
                              // name={option.label}
                              ref={field.ref}
                              value={option.value}
                              onChange={() => {
                                 field.onChange(option.value);
                                 onChange && onChange(option.value);
                              }}
                              checked={isActive}
                           />
                           <span className="fs-5">{option.label}</span>
                        </label>
                     </div>
                  );
               },
            )}
         </div>
      );
};

export default memo(Radio);

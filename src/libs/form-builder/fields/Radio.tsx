import React, { memo, useEffect, useState } from 'react';
import { useController } from 'react-hook-form';

import { CommonFieldConfig } from '@/libs/form-builder/types/fields';
import useFormStore from '@/libs/form-builder/store/useFormStore';

type Options = {
   label: string;
   value: any;
   colClass?: string;
};

export type RadioConfig = CommonFieldConfig & {
   type: 'radio' | 'checkbox';
   rowClass?: string;
   options?: Options[];
   text?: string;
   keys?: [label: string, value: string];
   isDashedStyle?: boolean;
};

const Radio: React.FC<RadioConfig> = (props) => {
   const { options = [], rowClass, accessor, keys = [], isDashedStyle = false, type, text } = props;
   const [_options, setOptions] = useState(options || []);

   const {
      field,
      fieldState: { error },
      formState: { isLoading},
   } = useController({ name: accessor });
   const handleSelectOption = (option: Options) => {
      if (type === 'checkbox' && options.length > 0) {
         if (Array.isArray(field.value)) {
            field.value.includes(option.value) ?
               field.onChange(field.value.filter((val) => val !== option.value))
            :  field.onChange([...field.value, option.value]);
         } else {
            field.onChange([option.value]);
         }
      } else {
         field.onChange(option.value);
      }
   };

   const checkActiveOption = (option: Options) => {
      return isDashedStyle && Array.isArray(field.value) ?
            field.value.includes(option.value)
         :  field.value === option.value;
   };

   useEffect(() => {
      if (keys.length === 2 && options.length > 0) {
         const [label, value] = keys;
         const filteredOptions = options
            .map((item: Record<string, any>) => {
               if (label in item) {
                  return {
                     label: item[label],
                     value: item[value],
                     colClass: item.colClass,
                  };
               }
            })
            .filter((item) => !!item);
         setOptions(filteredOptions);
      } else if (options.length > 0){
         setOptions(options);
      }
   }, []);


   if (_options.length > 0 && type === 'checkbox' && !isDashedStyle) {
      return _options.map((item, index) => {

         return (
            <div className={'col'} key={index}>
               <div className={'form-check '} >
                  <input
                     className="form-check-input"
                     type="checkbox"
                     ref={field.ref}
                     name={field.name}
                     disabled={isLoading}
                     onChange={() => {
                        handleSelectOption(item);
                     }}
                     checked={!!field.value?.some((val: string) => val === item.value)}
                     id={`checkbox_${item.value}`}
                  />
                  <label className="form-check-label" htmlFor={`checkbox_${item.value}`}>
                     {item.label}
                  </label>
               </div>
            </div>
         );
      });
   }
   if (!isDashedStyle && type === 'checkbox') {
      return (
         <div className={'form-check '}>
            <input
               className="form-check-input"
               type="checkbox"
               disabled={isLoading}
               {...field}
               id={`checkbox_${accessor}`}
            />
            <label className="form-check-label" htmlFor={`checkbox_${accessor}`}>
               {text}
            </label>
         </div>
      );
   }

   if (_options.length > 0)
      return (
         <div className={`row ${rowClass || 'row-cols-auto mb-2 g-2'}`}>
         {_options.map((option, index: number) => {
               let isActive = checkActiveOption(option);

               return (
                  <div className={option?.colClass || 'col'} key={index}>
                     <label
                        className={`btn btn-outline btn-outline-dashed btn-sm btn-active-light-primary w-100 ${
                           isActive ? 'active' : ''
                        } ${error ? 'border-danger ' : ''} ${isLoading ? 'disabled' : ''}`}
                     >
                        <input
                           type={type}
                           className="btn-check"
                           // name={option.label}
                           ref={field.ref}
                           value={`${option.value}`}
                           onChange={() => {}} //bypass no render
                           onClick={() => {
                              handleSelectOption(option);
                           }}
                           disabled={isLoading}
                           checked={isActive}
                        />
                        <span className="fs-6">{option.label}</span>
                     </label>
                  </div>
               );
            })}
         </div>
      );
};

export default memo(Radio);

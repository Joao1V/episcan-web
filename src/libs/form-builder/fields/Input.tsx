import React, { memo, useEffect, useState } from 'react';
import { useController } from 'react-hook-form';
import NumberFormat from 'react-number-format';

import { Spinner } from '../components/loading/Spinner';
import { CommonFieldConfig } from '../types/fields';

type TText = {
   type: 'text';
   maxLength?: number;
};
type TNumber = {
   type: 'number';
   isAllowNegative?: boolean;
   minLength?: number;
   maxLength?: number;
};
type TPassword = {
   type: 'password';
};

type TEmailAndLogin = {
   type: 'email' | 'login';
};

type TTextArea = {
   type: 'textarea';
   isResize?: boolean;
};
export type InputConfig = CommonFieldConfig & {
   addClassName?: string;
   disabled?: boolean;
   loading?: {
      type?: 'spinner' | 'skeleton';
      isFetching: boolean;
   };
} & (TText | TNumber | TPassword | TEmailAndLogin | TTextArea);

const Input: React.FC<InputConfig> = (props) => {
   const { addClassName, type, loading, accessor, disabled, placeholder } = props;
   const loadingType = loading?.type || 'spinner';

   const {
      field,
      fieldState: { error },
   } = useController({ name: accessor });

   if (type === 'text') {
      const { maxLength } = props;

      return (
         <div className={'position-relative'}>
            <input
               {...field}
               className={`form-control ${error ? 'is-invalid' : ''} ${addClassName || ''}`}
               placeholder={placeholder || ''}
               id={field.name}
               name={field.name}
               value={field?.value || ''}
               type={'text'}
               disabled={disabled || loading?.isFetching}
               maxLength={maxLength}
            />
            {loading?.isFetching && loadingType === 'spinner' && <Spinner />}
         </div>
      );
   }
   if (type === 'number') {
      const { minLength, maxLength, isAllowNegative } = props;
      return (
         <input
            {...field}
            className={`form-control ${error ? 'is-invalid' : ''} ${addClassName || ''}`}
            placeholder={placeholder || ''}
            id={field.name}
            name={field.name}
            value={field?.value || ''}
            type={'number'}
            disabled={disabled}
            minLength={minLength}
            maxLength={maxLength}
         />
      );
   }

   if (type === 'password') {
      return (
         <input
            {...field}
            className={`form-control ${error ? 'is-invalid' : ''} ${addClassName || ''}`}
            placeholder={placeholder || ''}
            id={field.name}
            name={field.name}
            value={field?.value || ''}
            type={type}
            disabled={disabled}
         />
      );
   }

   if (type === 'textarea') {
      const { isResize = false } = props;
      return (
         <textarea
            {...field}
            className={`form-control ${error ? 'is-invalid' : ''} ${isResize ? '' : 'resize-none'}`}
            placeholder={placeholder || ''}
            rows={5}
            id={field.name}
            value={field?.value || ''}
         ></textarea>
      );
   }

   if (type === 'login' || type === 'email') {
      const [isCpf, setIsCpf] = useState(false);

      const {
         field,
         fieldState: { error },
      } = useController({ name: accessor });
      const onChange = (value: string) => {
         const firstFour = value.slice(0, 4);
         const testValue = /^\d{4}$/.test(firstFour);

         if (value.length >= 4 && !isCpf && testValue) {
            setIsCpf(true);
         } else if (value.length <= 4 && isCpf) {
            setIsCpf(false);
         }
      };

      useEffect(() => {
         onChange(field.value || '');
      }, [field.value]);

      return (
         <>
            {isCpf && type === 'login' ?
               <NumberFormat
                  format="###.###.###-##"
                  value={field.value}
                  onValueChange={(values) => {
                     field.onChange(values.value);
                  }}
                  autoFocus={true}
                  getInputRef={field.ref}
                  onBlur={field.onBlur}
                  className={`form-control${error ? ' is-invalid' : ''}`}
                  placeholder="000.000.000-00"
                  name={field.name}
                  id={field.name}
               />
            :  <input
                  {...field}
                  className={`form-control${error ? ' is-invalid' : ''} ${addClassName || ''}`}
                  placeholder={placeholder || ''}
                  id={field.name}
                  name={field.name}
                  autoFocus={type === 'login' ? true : undefined}
                  value={field?.value || ''}
                  type={'email'}
                  disabled={disabled}
               />
            }
         </>
      );
   }
};

export default memo(Input);

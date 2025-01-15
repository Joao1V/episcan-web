'use client';

import React, { memo } from 'react';
import { useController } from 'react-hook-form';

import { CommonFieldConfig, FieldDefaultProps } from '../types/fields';
import { Masks } from '../utils/masks';
import saveValue from '../utils/saveValue';

export type PhoneInputConfig = CommonFieldConfig & {
   type: 'phone-input';
   onChange: (data: { onlyValue: string; formattedValue: string }) => any;
};

const PhoneInput = ({ config }: FieldDefaultProps<'phone-input'>) => {
   const { onChange, accessor } = config;

   function applyMask(number: string) {
      const formatted = Masks.dynamicMaskPhone(number);
      saveValue({
         field,
         data: {
            onlyValue: Masks.onlyDigits(number) || '',
            formattedValue: formatted,
         },
         fn: onChange,
         defaultKeys: ['onlyValue'],
      });
   }

   const {
      field,
      fieldState: { error },
   } = useController({ name: accessor });

   return (
      <input
         {...field}
         onChange={(e) => applyMask(e.target.value)}
         className={`form-control ${error ? 'is-invalid' : ''}`}
         value={Masks.dynamicMaskPhone(field.value)}
         name={field.name || 'phone_numbers'}
         id={field.name || 'phone_numbers'}
         type="tel"
         maxLength={15}
         placeholder="Digite seu telefone"
      />
   );
};

export default memo(PhoneInput);

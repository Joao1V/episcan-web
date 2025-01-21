import React, { memo } from 'react';
import { useController } from 'react-hook-form';
import NumberFormat, { NumberFormatValues } from 'react-number-format';

import { CommonFieldConfig } from '../types/fields';

import { Spinner } from '@/libs/form-builder/components/loading/Spinner';

type CpfCnpjConfig = {
   type: 'cpf' | 'cnpj';
   format?: never;
};
type Loading = {
   type?: 'spinner' | 'skeleton';
   isFetching?: boolean;
};
type NumberFormatConfig = {
   type: 'number-format';
   format: string;
   loading?: Loading;
};

export type MaskedInputConfig = CommonFieldConfig & {
   onChange?: (value: NumberFormatValues) => void;
   disabled?: boolean;
} & (CpfCnpjConfig | NumberFormatConfig);

const MaskedInput: React.FC<MaskedInputConfig> = (props) => {
   const { placeholder, accessor, format, onChange, type } = props;
   let loading: Loading | undefined;

   if (type === 'number-format') {
      loading = {
         type: 'spinner',
         ...props.loading,
      };
   }
   const {
      field,
      fieldState: { error },
   } = useController({ name: accessor });

   return (
      <div className={'position-relative'}>
         <NumberFormat
            value={field?.value || ''}
            getInputRef={field.ref}
            id={field.name}
            onValueChange={(e, sourceInfo) => {
               if (sourceInfo.event) {
                  field.onChange(e.value);
                  if (onChange) {
                     onChange(e);
                  }
               }
            }}
            className={`form-control ${error ? 'is-invalid' : ''}`}
            placeholder={placeholder || ''}
            format={format}
            disabled={loading?.isFetching || false}
         />
         {loading?.isFetching && loading?.type === 'spinner' && <Spinner />}
      </div>
   );
};

export default memo(MaskedInput);

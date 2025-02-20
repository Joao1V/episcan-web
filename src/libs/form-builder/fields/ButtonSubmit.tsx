import React, { memo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { CommonFieldConfig, FieldDefaultProps } from '../types/fields';

export type SubmitConfig = Pick<CommonFieldConfig, 'col' | 'showIf'> & {
   type: 'submit';
   text: string | React.ReactNode;
   textLoading?: string;
   options?: {
      buttonClassName?: string;
      buttonType?: 'primary' | 'secondary';
      enableIf?: {
         accessor: string;
         value: string | number | ((value: any) => any);
      };
   };
   isFetching?: boolean;
};
const ButtonSubmit = (props: SubmitConfig) => {
   const {
      formState: { isSubmitting },
   } = useFormContext();

   const { text, textLoading = 'Aguarde...', isFetching = false } = props;

   const { options } = props;

   const dependentValue = useWatch({ name: options?.enableIf?.accessor || '' });
   const dependentEnable = () => {
      if (options && 'enableIf' in options && options.enableIf) {
         if (typeof options.enableIf.value === 'function') {
            const conditional = options.enableIf.value(dependentValue || '');
            return !conditional;
         } else if (dependentValue !== options.enableIf.value) {
            return true;
         }
      }
      return false;
   };
   return (
      <div className={`d-flex justify-content-end`}>
         <button
            disabled={dependentEnable() || isSubmitting || isFetching}
            className={`btn btn-${options?.buttonType || 'primary'} ${options?.buttonClassName || ''}`}
            type={'submit'}
         >
            {isSubmitting ?
               <div className={'d-flex flex-center gap-4'}>
                  <div className="spinner-border spinner-border-sm" role="status"></div>
                  <span>{textLoading}</span>
               </div>
            :  text}
         </button>
      </div>
   );
};

export default memo(ButtonSubmit);

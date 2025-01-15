import React, { memo } from 'react';
import { useFormContext } from 'react-hook-form';

import { CommonFieldConfig, FieldDefaultProps } from '../types/fields';

export type SubmitConfig = Pick<CommonFieldConfig, 'col' | 'showIf'> & {
   type: 'submit';
   text: string | React.ReactNode;
   textLoading?: string;
   options?: {
      buttonClassName?: string;
      buttonType?: 'primary' | 'secondary';
   };
};
const ButtonSubmit = ({ config }: FieldDefaultProps<'submit'>) => {
   const {
      formState: { isSubmitting },
   } = useFormContext();

   const { text, textLoading = 'Aguarde...' } = config;

   const { options } = config;

   return (
      <div className={`d-flex justify-content-end`}>
         <button
            disabled={isSubmitting}
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

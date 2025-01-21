import React, { memo } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

import RenderField from '@/libs/form-builder/components/RenderField';

const RenderController = (props: any) => {
   const { config } = props;
   const {
      watch,
      formState: { errors },
   } = useFormContext();

   return config.fields.map((item: any, index: number) => {
      const accessor = item.accessor || '';
      const isErrorField: any = errors[accessor];
      if ('showIf' in item) {
         const dependentValue = watch(item.showIf.accessor);

         if (typeof item.showIf.value === 'function') {
            const conditional = item.showIf.value(dependentValue || '');
            if (!conditional) {
               return null;
            }
         } else if (dependentValue !== item.showIf.value) {
            return null;
         }
      }

      if (!('type' in item) && 'render' in item) {
         return (
            <div key={index} className={`${item.col || config?.col || 'col-md-6'}`}>
               {item.render ? item.render() : null}
            </div>
         );
      }

      return (
         <div
            className={`${item.col || config?.col || 'col-md-6'} ${
               item?.isHorizontal ? 'd-flex align-items-center' : ''
            }`}
            key={index}
         >
            {React.isValidElement('label' in item && item.label) ?
               'label' in item ?
                  item?.label
               :  null
            :  'label' in item &&
               item.label && (
                  <label
                     className={`form-label ${item?.isHorizontal ? 'mb-0 me-2' : ''}`}
                     htmlFor={accessor}
                  >
                     {item.label}
                  </label>
               )
            }
            <RenderField item={item} />

            {isErrorField ?
               <p className={'invalid-feedback d-block mb-1'}>{isErrorField.message}</p>
            :  item?.helperInput && <small className={'form-text'}>{item.helperInput}</small>}
         </div>
      );
   });
};

export default memo(RenderController);

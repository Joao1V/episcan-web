import React, { memo } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

import { clsx } from 'clsx';
import { FormBuilderConfig } from 'form-builder';

import RenderField from '@/libs/form-builder/components/RenderField';

const RenderController = (config: FormBuilderConfig) => {
   const { fields } = config;

   const {
      watch,
      formState: { errors },
   } = useFormContext();

   return fields.map((item: any, index: number) => {
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
            className={clsx(
               {
                  'col-md-6': !(
                     item?.isHorizontal ||
                     config?.isHorizontal ||
                     item.col ||
                     config.col
                  ),
               },
               item.col ? `${item.col}`
               : config?.col ? `${config.col}`
               : null,

               {
                  ['row mb-5']: item?.isHorizontal || config.isHorizontal,
               },
            )}
            key={index}
         >
            {React.isValidElement('label' in item && item.label) ?
               'label' in item ?
                  <div
                     className={clsx(
                        {
                           'col-lg-4 col-form-label': item?.isHorizontal || config.isHorizontal,
                        },
                        item?.rowLabelClass,
                     )}
                  >
                     <label
                        className={clsx(
                           !(item?.isHorizontal || config.isHorizontal) ? 'form-label' : null,
                           item?.labelClass,
                        )}
                        htmlFor={accessor}
                     >
                        {item?.label}
                     </label>
                  </div>
               :  null
            :  'label' in item &&
               item.label && (
                  <div
                     className={clsx(
                        {
                           'col-lg-4': item?.isHorizontal || config.isHorizontal,
                        },
                        item?.rowLabelClass,
                     )}
                  >
                     <label
                        className={clsx(
                           'form-label',
                           {
                              'col-form-label': item?.isHorizontal || config.isHorizontal,
                           },
                           item?.labelClass,
                        )}
                        htmlFor={accessor}
                     >
                        {item.label}
                     </label>
                  </div>
               )
            }
            <div
               className={clsx(
                  {
                     'col-lg-8 fv-row fv-plugins-icon-container':
                        item?.isHorizontal || config.isHorizontal,
                  },
                  item?.rowClass,
               )}
            >
               <RenderField item={item} />
            </div>

            {isErrorField ?
               <p className={'invalid-feedback d-block mb-1'}>{isErrorField.message}</p>
            :  item?.helperInput &&
               !(item?.isHorizontal || config.isHorizontal) && (
                  <small className={'form-text'}>{item.helperInput}</small>
               )
            }
         </div>
      );
   });
};

export default memo(RenderController);

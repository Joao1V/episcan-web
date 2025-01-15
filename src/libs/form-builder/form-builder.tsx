'use client';

import React from 'react';
import { FormProvider, UseFormReturn, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import RenderController from './components/RenderController';
import useFormStore from './store/useFormStore';
import { FormField } from './types/fields';
import { generateSchema } from './utils/helpers';

export interface FormBuilderConfig {
   col?: string;
   formClassName?: string;
   fields: FormField[];
   schema?: yup.ObjectSchema<any>;
}
interface FormBuilderProps {
   config: FormBuilderConfig;
   isLoading?: boolean;
   isResetOnSubmit?: boolean;
   isEnableWatcher?: boolean;
   id?: string;
   defaultValues?: Record<string, any>;
   onSubmit?: (args: Record<string, any>) => Promise<void>;
}
const FormBuilder: React.FC<FormBuilderProps> = (props) => {
   const { config, id, isEnableWatcher, defaultValues, isResetOnSubmit = true } = props;

   const methods = useForm({
      resolver: yupResolver(config?.schema || generateSchema(config.fields) || null),
      defaultValues: defaultValues,
   }) as UseFormReturn<Record<string, any>>;

   const {
      handleSubmit,
      formState: { errors, isSubmitting, isValid, isLoading },
      reset,
      setValue,
      watch,
      getValues,
   } = methods;

   const { setForm, updater, watcher, clearForm } = useFormStore();

   const _formBuilderReturn = React.useRef({
      data: {
         ...defaultValues,
      },
      watch,
      reset,
      errors,
      isSubmitting,
      setValue,
      onValidateForm: async (isReturnValue = false) => {
         try {
            let isValidForm = true;
            const onError = () => {
               isValidForm = false;
            };
            await handleSubmit(onSubmit, onError)();

            if (isValidForm) {
               return isReturnValue ? getValues() : isValidForm;
            } else {
               return isValidForm;
            }
         } catch (e) {
            throw e;
         }
      },
   });

   const onSubmit = React.useCallback(async (args: Record<string, any>) => {
      if (props?.onSubmit) {
         try {
            const returnedArgs = { ...args };
            config.fields.forEach((item) => {
               // if (item.showIf) {
               //    const dependentValue = args[item.showIf.accessor];
               //    if (dependentValue !== item.showIf.value) {
               //       if ('accessor' in item && item.accessor) {
               //          delete returnedArgs[item.accessor];
               //       }
               //    }
               // }

               if ('ignore' in item && item.ignore === true) {
                  if (item.accessor) {
                     delete returnedArgs[item.accessor];
                  }
               }
            });
            await props.onSubmit(returnedArgs);
            if (isResetOnSubmit) {
               let resetValues: any = {};
               config.fields.forEach((item) => {
                  if ('accessor' in item && item.accessor) resetValues[item.accessor] = '';
               });
               reset(resetValues);
            }
         } catch (e) {
            console.log('error', e);
            throw e;
         }
      }
   }, []);

   React.useEffect(() => {
      if (Object.keys(errors).length > 0 && id) {
         if (id) {
            updater(id, 'errors', errors);
         }
      }
   }, [errors, isSubmitting]);

   React.useEffect(() => {
      if (id && isValid) {
         updater(id, 'isSubmitting', isSubmitting);
      }
   }, [isSubmitting]);

   React.useEffect(() => {
      if (id) {
         setForm(id, _formBuilderReturn.current);
      }
      if (id && isEnableWatcher) {
         const subscription = watch((value: any) => watcher(id, value));
         return () => {
            clearForm(id);
            return subscription.unsubscribe();
         };
      }
   }, []);

   return (
      <FormProvider {...methods}>
         <form
            onSubmit={handleSubmit(onSubmit)}
            autoComplete={'off'}
            id={id || ''}
            className={`row ${config?.formClassName || 'gy-3'}`}
         >
            <RenderController config={config} />
         </form>
      </FormProvider>
   );
};

export default React.memo(FormBuilder);

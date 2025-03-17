'use client';

import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { clsx } from 'clsx';
import * as yup from 'yup';

import RenderController from './components/RenderController';
import useFormStore from './store/useFormStore';
import { FormField } from './types/fields';
import { generateSchema } from './utils/helpers';

export interface FormBuilderConfig {
   col?: string;
   formClassName?: string;
   isHorizontal?: boolean;
   fields: FormField[];
   schema?: yup.ObjectSchema<any>;
}
export interface FormBuilderProps {
   config: FormBuilderConfig;
   isResetOnSubmit?: boolean;
   isSubmitOnEnter?: boolean;
   isEnableWatcher?: boolean;
   id?: string;
   defaultValues?: Record<string, any>;
   onSubmit?: (args: Record<string, any>) => Promise<void> | void;
   onFetchData?: {
      fn: () => Promise<any>;
      enabled?: boolean;
   };
}
const FormBuilder: React.FC<FormBuilderProps> = (props) => {
   const {
      config,
      id,
      isSubmitOnEnter,
      isEnableWatcher,
      defaultValues,
      isResetOnSubmit = true,
   } = props ?? {};

   const methods = useForm({
      resolver: yupResolver(config?.schema || generateSchema(config.fields) || null),
      defaultValues: async () => {
         if (props.onFetchData) {
            const { enabled = true, fn } = props.onFetchData;

            if (!enabled) {
               return defaultValues
            }

            const response = await fn();

            return {
               ...defaultValues,
               ...response,
            };
         } else {
            return defaultValues;
         }
      },
   }) ;

   const {
      handleSubmit,
      formState: { errors, isSubmitting, isValid, isLoading },
      reset,
      setValue,
      setFocus,
      setError,
      watch,
      getValues,
   } = methods;

   const { setForm, updater, watcher, clearForm } = useFormStore();

   const showErrors = React.useCallback((e: any) => {
      if (e?.cause?.formattedErrors) {
         console.log(e?.cause);
         Object.entries(e.cause.formattedErrors as Record<string, string>).forEach(
            ([key, value]) => {
               setError(key, { type: 'custom', message: value });
            },
         );
      }
   }, []);

   const _formBuilderReturn = React.useRef({
      data: {
         ...defaultValues,
      },
      watch,
      reset,
      errors,
      isSubmitting,
      setValue,
      setFocus,
      showValidatorMessages: showErrors,
      onValidateForm: async (isReturnValue = false) => {
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
               //Dessa forma vai resetar o formulario para os valores padrao de quando iniciou
               reset();
            }
         } catch (e: any) {
            console.log('FORM_BUILDER', e);
            showErrors(e);
         }
      }
   }, []);

   const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLFormElement>) => {
         if (isSubmitOnEnter && e.key === 'Enter' && !isSubmitting) {
            e.preventDefault();
            handleSubmit(onSubmit)();
         }
      },
      [isSubmitting],
   );

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

         if (!isEnableWatcher) {
            return () => {
               clearForm(id);
            };
         }
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
            onKeyDown={handleKeyDown}
            autoComplete={'off'}
            id={id || undefined}
            className={clsx(
               {
                  row: !config.isHorizontal,
               },
               config.formClassName ? `${config.formClassName}`
               : !config.isHorizontal ? 'gy-3'
               : undefined,
            )}
         >
            <RenderController {...config} />
         </form>
      </FormProvider>
   );
};

export default React.memo(FormBuilder);

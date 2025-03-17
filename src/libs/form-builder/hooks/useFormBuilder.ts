'use client';

import type {
   FieldErrorsImpl,
   FieldValues,
   UseFormReset,
   UseFormSetFocus,
   UseFormSetValue,
   UseFormWatch,
} from 'react-hook-form';

import useFormStore, { FormState, ReturnedValidate } from '@/libs/form-builder/store/useFormStore';
import { FormBuilderProps } from 'form-builder';

export type FormStructure<T extends FieldValues> = {
   data: T;
   reset: UseFormReset<T>;
   errors: FieldErrorsImpl<T>;
   watch: UseFormWatch<T>;
   onValidateForm: (isReturnValue?: boolean) => Promise<T> | T;
   setValue: UseFormSetValue<T>;
   setFocus: UseFormSetFocus<T>;
   showValidatorMessages: (errors: any) => void;
   isSubmitting: boolean;
};

type UseFormBuilderArray<T extends string[]> = Record<T[number], FormStructure<any>> & {
   validateForms: (id?: string[]) => Promise<ReturnedValidate>;
   validator: (errors?: unknown) => void;
};
type UseFormBuilder = FormStructure<any>;

type UseFormBuilderReturn<T extends string | string[]> =
   T extends string[] ? UseFormBuilderArray<T> : UseFormBuilder;

const useFormBuilder = <T extends string | string[]>(id: T): UseFormBuilderReturn<T> => {
   const { form } = useFormStore();
   const _id = id;

   if (Array.isArray(_id)) {
      const formKeysSet = new Set(Object.keys(form));

      const resultForms = _id.reduce((acc: Record<string, FormStructure<any>>, formId) => {
         if (formKeysSet.has(formId)) {
            acc[formId] = form[formId];
         }
         return acc;
      }, {}) as Record<T[number], any>;

      return {
         ...resultForms,
         validateForms: async (id?: string[]) => {
            const aux = id || _id;
            const isValidKeys = aux.every((key) => form[key]);
            let payload: Record<string, any> = {};
            if (!isValidKeys) {
               const missingKeys = aux.filter((key) => !(key in form));
               throw new Error(`Invalid IDs: ${missingKeys.join(', ')}`);
            }
            if (isValidKeys) {
               const dataForms: any = {};
               let isValidForm = true;

               await Promise.all(
                  aux.map(async (key) => {
                     const data = await form[key].onValidateForm(true);
                     if (!data) {
                        isValidForm = false;
                     }
                     dataForms[key] = data;
                  }),
               );

               aux.forEach((key) => {
                  payload = {
                     ...payload,
                     ...dataForms[key],
                  };
               });

               return {
                  dataForms,
                  payload,
                  isValidForm,
               };
            }
            return {} as ReturnedValidate;
         },

         validator: (errors: unknown) => {
            _id.map((key) => form[key].showValidatorMessages(errors));
         },
      } as UseFormBuilderReturn<T>;
   }

   return {
      ...form[id as string],
   } as UseFormBuilderReturn<T>;
};

export { useFormBuilder };

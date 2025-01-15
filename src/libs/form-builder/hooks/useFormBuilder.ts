'use client';

import type {
   FieldErrorsImpl,
   FieldValues,
   UseFormReset,
   UseFormSetValue,
   UseFormWatch,
} from 'react-hook-form';

import useFormStore from '@/libs/form-builder/store/useFormStore';

export type FormStructure<T extends FieldValues> = {
   data: T;
   reset: UseFormReset<T>;
   errors: FieldErrorsImpl<T>;
   watch: UseFormWatch<T>;
   onValidateForm: (isReturnValue?: boolean) => Promise<T> | T;
   setValue: UseFormSetValue<T>;
   isSubmitting: boolean;
};
const useFormBuilder = (id: string) => {
   const { form } = useFormStore();

   return form[id] || ({} as FormStructure<any>);
};

export { useFormBuilder };

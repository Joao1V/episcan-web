import { FieldValues } from 'react-hook-form';

import { FormStructure } from '../hooks/useFormBuilder';
import { create } from 'zustand';

export interface FormState<T extends FieldValues> {
   form: {
      [key: string]: FormStructure<T>;
   };
   setForm: (id: string, formBuilderReturn: FormStructure<T>) => void;
   updater: (id: string, key: string, value: T) => void;
   watcher: (id: string, values: T) => void;
   clearForm: (id: string) => void;
}

const useFormStore = create<FormState<any>>((set) => ({
   form: {},
   setForm: (id, formBuilderReturn) =>
      set((state) => {
         return { form: { ...state.form, [id]: formBuilderReturn } };
      }),
   watcher: (id, values) =>
      set((state) => {
         if (state.form[id]) {
            state.form[id].data = values;
         }
         return {};
      }),
   updater: (id, key, value) =>
      set((state) => ({
         form: {
            ...state.form,
            [id]: {
               ...state.form[id],
               [key]: value,
            },
         },
      })),
   clearForm: (id) =>
      set((state) => {
         const { [id]: removed, ...rest } = state.form;

         return { form: rest };
      }),
}));
export default useFormStore;

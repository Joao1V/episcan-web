import { FieldValues } from 'react-hook-form';

import { FormStructure } from '../hooks/useFormBuilder';
import { create } from 'zustand';

export interface ReturnedValidate {
   dataForms: Record<string, any>;
   payload: Record<string, any>;
   isValidForm: boolean;
}
export interface FormState<T extends FieldValues> {
   /** Dados do formulário */
   form: {
      [key: string]: FormStructure<T>;
   };
   /** Salva os dados do formulário no store */
   setForm: (id: string, formBuilderReturn: FormStructure<T>) => void;
   /** Atualiza os dados do formulário no store */
   updater: (id: string, key: string, value: T) => void;
   /** Ativa o retorno dos dados do formulário */
   watcher: (id: string, values: T) => void;
   /** Remove do cache quando componente é desmontado */
   clearForm: (id: string) => void;
}

const useFormStore = create<FormState<any>>((set, getState) => ({
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

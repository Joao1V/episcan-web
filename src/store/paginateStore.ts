import { create } from 'zustand/index';





interface PaginateStore {
   paginate: {
      [key: string]: {
         [key: string]: any
      };
   };
   register: (key: string, defaultValue: any) => void;
   setFilter: (key: string, value: any) => void;
   unmount: (key: string) => void;
}

export const paginateStore = create<PaginateStore>((set) => ({
   paginate: {},
   register: (key, defaultValue) => set(() => ({ paginate: { [key]: defaultValue } })),
   unmount: (key) =>
      set((state) => {
         delete state.paginate[key];

         return state;
      }),
   setFilter: (key, value) =>
      set(() => {
         console.log(key, value);
         return { paginate: { [key]: value } };
      }),
}));

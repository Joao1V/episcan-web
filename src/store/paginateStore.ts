import { create } from 'zustand/index';

interface PaginateStore {
   paginate: {
      [key: string]: any;
   };
   registerFilters: (key: string, initialParams: any) => void;
   setFilter: (key: string, params: any) => void;
   removeFilters: (key: string) => void;
}

export const paginateStore = create<PaginateStore>((set) => ({
   paginate: {},
   registerFilters: (key, initialParams) => set(() => ({ paginate: { [key]: initialParams } })),
   removeFilters: (key) =>
      set((state) => {
         delete state.paginate[key];

         return state;
      }),
   setFilter: (key, params) =>
      set(() => {
         console.log(key, params);
         return { paginate: { [key]: params } };
      }),
}));

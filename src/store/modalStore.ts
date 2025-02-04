import { create } from 'zustand/index';

interface ModalStore {
   modal: {
      [key: string]: boolean;
   };
   registerModal: (key:string) => void
   setModal: (key:string, isShow: boolean) => void
   removeModal: (key:string) => void
}

export const modalStore = create<ModalStore>((set) => ({
   modal: {},
   registerModal: (key) => set(() => ({ modal: { [key]: false } })),
   removeModal: (key) => set((state) => {
      delete state.modal[key];

      return state;
   }),
   setModal: (key, isShow) =>
      set(() => {
         return { modal: { [key]: isShow }};
      }),
}));
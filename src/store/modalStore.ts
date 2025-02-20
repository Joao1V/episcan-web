import { create } from 'zustand/index';

interface ModalStore {
   modal: {
      [key: string]: boolean;
   };
   registerModal: (key:string, initialValue:boolean) => void
   setModal: (key:string, isShow: boolean) => void
   removeModal: (key:string) => void
}

export const modalStore = create<ModalStore>((set) => ({
   modal: {},
   registerModal: (key, initialValue) => set(() => ({ modal: { [key]: (initialValue || false) } })),
   removeModal: (key) => set((state) => {
      delete state.modal[key];

      return state;
   }),
   setModal: (key, isShow) =>
      set(() => {
         return { modal: { [key]: isShow }};
      }),
}));
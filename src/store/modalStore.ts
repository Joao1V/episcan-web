import { create } from 'zustand/index';

interface ModalStore {
   modal: {
      [key: string]: boolean;
   };
   modalProps: any;
   registerModal: (key:string, initialValue:boolean) => void
   setModal: (key:string, isShow: boolean, props?: any) => void
   removeModal: (key:string) => void
}

export const modalStore = create<ModalStore>((set) => ({
   modal: {},
   modalProps: {},
   registerModal: (key, initialValue) => set(() => ({ modal: { [key]: (initialValue || false) } })),
   removeModal: (key) => set((state) => {
      delete state.modal[key];
      delete state.modalProps[key];

      return state;
   }),
   setModal: (key, isShow, props) => {
      return set(() => {
         return { modal: { [key]: isShow }, modalProps: { [key]: props }};
      });
   },
}));
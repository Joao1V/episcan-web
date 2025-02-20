'use client';

import { useEffect } from 'react';

import { modalStore } from '@/store/modalStore';

type Options = {
   initialShow: boolean;
}

type UseModal = {
   isShow: boolean;
   setModal: (show: boolean) => void;
}
export const useModal = (key: string, options?: Options ) => {
   const { modal, setModal, registerModal, removeModal } = modalStore();

   useEffect(() => {
      registerModal(key, (options?.initialShow || false));
      return () => {
         removeModal(key);
      };
   }, []);

   return {
      isShow: modal[key] || false,
      setModal: (show: boolean) => setModal(key, show),
   };
};

'use client';

import { useEffect } from 'react';

import { modalStore } from '@/store/modalStore';

type Options = {
   initialShow: boolean;
}
export const useModal = (key: string, options?: Options ) => {
   const { modal, setModal, registerModal, removeModal } = modalStore();

   useEffect(() => {
      registerModal(key);
      if (options?.initialShow) {
         setModal(key, options.initialShow);
      }
      return () => {
         removeModal(key);
      };
   }, []);

   return {
      isShow: modal[key] || false,
      setModal: (show: boolean) => setModal(key, show),
   };
};

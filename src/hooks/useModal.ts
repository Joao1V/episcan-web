'use client';

import { useEffect } from 'react';

import { modalStore } from '@/store/modalStore';

type Options = {
   initialShow: boolean;
}

export const useModal = (key: string, options?: Options ) => {
   const { modal, setModal, registerModal, removeModal, modalProps } = modalStore();

   useEffect(() => {
      registerModal(key, (options?.initialShow || false));
      return () => {
         removeModal(key);
      };
   }, []);

   return {
      isShow: modal[key] || false,
      setModal: (show: boolean, props?: any) => setModal(key, show, props),
      modalProps: modalProps[key] || null,
   };
};

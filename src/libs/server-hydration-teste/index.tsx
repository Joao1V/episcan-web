'use client'

import { ServerHydrationProps } from './types';
import { useGetData } from '@/hooks';

export default function ServerHydration(props: ServerHydrationProps) {
   const { initialData } = props

   if (Array.isArray(initialData)) {
      for (const item of initialData) {
         useGetData({
            queryKey: item.queryKey,
            url: item.url,
            serverData: item.data,
            initialFn: (serverData) => {
               if (serverData && item.url.includes('paginate')) {
                  return serverData?.object
               }
            },
            onSuccess: (response) => {
               console.log('cebola aqui');
               if (response && item.url.includes('paginate')) {
                  return response?.object
               }
            }
         })
      }
   }

   return props.children;
}

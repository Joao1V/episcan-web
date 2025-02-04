'use client';

import { usePathname, useRouter } from 'next/navigation';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import index from 'libs/axios';

interface OptionsProps {
   url: string;
   queryKey?: Array<any>;
   onSuccess?: (response: any) => any | void;
   initialFn?: (serverData: any) => any | void; //A FUNCAO VAI RODAR APENAS UMA VEZ NA PRIMEIRA MONTAGEM DO COMPONENTE, O OBJETIVO PRINCIPAL É PARA FILTRAR OS DADOS QUE VIER DO SERVERDATA
   enabled?: boolean | null;
   params?: object | any;
   serverData?: any;
   isKeepPrevious?: boolean;
   isClub?: boolean;
   isQueryString?: boolean;
}

interface MyQueryOptionsProps {
   queryKey: Array<any>;
   queryFn: () => Promise<any>;
   placeholderData?: any;
   enabled?: boolean;
   initialData?: any;
}

export const useGetData = (options: OptionsProps) => {
   let {
      url,
      queryKey,
      isKeepPrevious,
      onSuccess,
      initialFn,
      enabled = null,
      params,
      isClub,
      isQueryString,
      serverData,
   } = options;

   const isServer = typeof window === 'undefined';

   const router = useRouter();
   const pathname = usePathname();

   const getDataFn = async () => {
      try {
         if (isQueryString) {
            // const searchParams = objectToQueryString(params);
            // router.push(`${pathname}${searchParams}`);
         }

         let response = await index.get(url, params, { isClub: isClub });

         if (onSuccess) {
            let aux: any = await onSuccess(response || null);
            if (aux) {
               return aux;
            }
         }

         return response;
      } catch (e) {
         throw e;
      }
   };

   const queryOptions: MyQueryOptionsProps = {
      queryKey: queryKey || [url],
      queryFn: getDataFn,
      placeholderData: isKeepPrevious ? keepPreviousData : undefined,
      enabled: enabled === null ? true : enabled,
      ...(serverData ?
         {
            initialData:
               initialFn ?
                  () => {
                     let aux = initialFn(serverData);
                     if (aux) {
                        return aux;
                     } else {
                        return serverData;
                     }
                  }
               :  serverData,
         }
      :  {}),
   };

   const queryResult = useQuery(queryOptions);

   const { data, isLoading, refetch, isFetching, isError, error } = queryResult || {};

   const isEmptyData = data?.data?.length === 0;

   return { data, isLoading, refetch, isFetching, isEmptyData, isError, error };
};

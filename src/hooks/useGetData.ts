'use client';

import { useMemo } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import { keepPreviousData, useQuery, useQueryClient } from '@tanstack/react-query';
import index from 'libs/axios';

interface OptionsProps {
   url: string;
   queryKey?: Array<any>;
   filterKey?: string;
   onSuccess?: (response: any) => any | void;
   initialFn?: (serverData: any) => any | void; //A FUNCAO VAI RODAR APENAS UMA VEZ NA PRIMEIRA MONTAGEM DO COMPONENTE, O OBJETIVO PRINCIPAL É PARA FILTRAR OS DADOS QUE VIER DO SERVERDATA
   enabled?: boolean | null;
   params?: object | any;
   serverData?: any;
   isKeepPrevious?: boolean;
   isQueryString?: boolean;
   staleTime?: number | undefined;
}

interface MyQueryOptionsProps {
   queryKey: Array<any>;
   queryFn: () => Promise<any>;
   placeholderData?: any;
   enabled?: boolean;
   initialData?: any;
   staleTime?: number | undefined;
}

export type GetDataResponse = {
   data: any;
   filterKey: string;
   error: unknown | null;
   isEmptyData: boolean;
   isError: boolean;
   isFetching: boolean;
   isLoading: boolean;
   refetch: () => void;
   setData: (newData: any, isPaginate?: boolean) => void;
   setDataUnique: (label: string, value: any) => void;
   promise: Promise<any>
};

export const useGetData = (options: OptionsProps): GetDataResponse => {
   let {
      url,
      queryKey,
      filterKey = '',
      isKeepPrevious,
      onSuccess,
      initialFn,
      enabled = null,
      params,
      isQueryString,
      serverData,
      staleTime,
   } = options;

   const isServer = typeof window === 'undefined';

   const router = useRouter();
   const pathname = usePathname();
   const queryClient = useQueryClient();
   const getDataFn = async () => {
      try {
         if (isQueryString) {
            // const searchParams = objectToQueryString(params);
            // router.push(`${pathname}${searchParams}`);
         }

         let response = await index.get(url, params);

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

   const setDataUnique = (label: string, value: any) => {
      queryClient.setQueryData(queryKey || [url], (oldData: any) => {
         return {
            ...oldData,
            [label]: value,
         };
      });
   };

   const setData = async (newData: any, isPaginate?: boolean) => {
      queryClient.setQueryData(queryKey || [url], (oldData: any) => {
         if (isPaginate) {

            return {
               ...oldData,
              data: newData
            };
         }
         return {
            ...oldData,
            ...newData,
         };
      });
   };

   const queryOptions: MyQueryOptionsProps = useMemo(
      () => ({
         queryKey: queryKey || [url],
         queryFn: getDataFn,
         placeholderData: isKeepPrevious ? keepPreviousData : undefined,
         enabled: enabled === null ? true : enabled,
         staleTime: staleTime,
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
      }),
      [options],
   );

   const { data, isLoading, refetch, isFetching, isError, error, promise } = useQuery(queryOptions);

   const isEmptyData = data?.data?.length === 0;

   return {
      data,
      isLoading,
      refetch,
      isFetching,
      isEmptyData,
      isError,
      error,
      filterKey,
      promise,
      setData,
      setDataUnique,
   };
};

'use client';

import { keepPreviousData, useQuery, useQueryClient } from '@tanstack/react-query';
import api from 'api';

import { ResponsePaginate } from '@/libs/axios/types';

interface OptionsProps<TResponse> {
   url: string;
   queryKey?: Array<any>;
   filterKey?: string;
   onSuccess?: (response: TResponse) => Partial<TResponse> | void | object; // Espera um retorno do tipo T
   initialFn?: (serverData: any) => TResponse | void; // Filtra os dados e retorna T
   enabled?: boolean | null;
   params?: object | any;
   serverData?: any;
   isKeepPrevious?: boolean;
   isQueryString?: boolean;
   staleTime?: number | undefined;
}

type ExtractData<T> = T extends { current_page: number; data: any } ? T['data'] : T;

export type GetDataReturn<T> = {
   data: T;
   filterKey: string;
   error: unknown | null;
   isEmptyData: boolean;
   isError: boolean;
   isFetching: boolean;
   isLoading: boolean;
   refetch: () => Promise<any>;
   setData: (newData: ExtractData<T>) => void;
   setDataUnique: (label: string, value: any) => void;
   promise: Promise<any>;
};
const isPaginated = <T>(data: unknown): data is ResponsePaginate<T> => {
   return typeof data === 'object' && data !== null && 'current_page' in data;
};
export const useGetData = <TData = any, TResponse = any>(
   options: OptionsProps<TResponse>,
): GetDataReturn<TData> => {
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

   const queryClient = useQueryClient();

   const getDataFn = async () => {
      try {
         if (isQueryString) {
            // const searchParams = objectToQueryString(params);
            // router.push(`${pathname}${searchParams}`);
         }

         let response = await api.get<TResponse>(url, params);

         if (onSuccess) {
            let aux = await onSuccess(response);
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

   const setData = async <K extends ExtractData<TData>>(newData: K) => {
      queryClient.setQueryData(queryKey || [url], (oldData: any) => {
         console.log(isPaginated(oldData));
         if (isPaginated(oldData)) {
            return {
               ...oldData,
               data: newData,
            };
         }
         return {
            ...oldData,
            ...newData,
         };
      });
   };

   const { data, isLoading, refetch, isFetching, isError, error, promise } = useQuery({
      queryKey: queryKey || [url],
      queryFn: getDataFn,
      placeholderData: isKeepPrevious ? keepPreviousData : undefined,
      enabled: enabled === null ? true : enabled,
      staleTime: staleTime,
      initialData:
         serverData ?
            initialFn &&
            (() => {
               let aux = initialFn(serverData);
               if (aux) {
                  return aux;
               } else {
                  return serverData;
               }
            })
         :  undefined,
   });

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

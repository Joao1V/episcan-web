import { redirect } from 'next/navigation';

import axios from 'axios';

import { API_HEADER_MAIN } from './headers';
import { showLoadingToast, updateToast } from './toast';
import { Options, RequestParams } from './types';
import { isClient, isServer } from './utils/constants';
import { formatValidatorErrors } from './utils/formatValidator';
import { getToken } from './utils/token';

const instance = axios.create({
   baseURL: process.env.NEXT_PUBLIC_API_BASE_URL_MAIN,
   headers: API_HEADER_MAIN,
});

// EXECUTA ANTES DO REQUEST
instance.interceptors.request.use(async (config) => {
   const { userToken, isDisableToast } = config.options ?? {};

   if (config.method !== 'get' && isClient && !isDisableToast) {
      showLoadingToast('Carregando...');
   }
   const token = await getToken();
   config.headers['userToken'] = token || userToken;

   return config;
});
//CAPTURA A RESPOSTA
instance.interceptors.response.use(
   (config) => {
      if (isClient) {
         updateToast({
            type: 'success',
            message: config?.data?.message || 'Realizado com sucesso',
         });
      }

      return config;
   },
   (error) => {
      if (!isServer && error) {
         updateToast({
            type: 'error',
            message: error?.response.data?.message || 'Ops, ocorreu um erro!',
         });
      }

      return Promise.reject(error);
   },
);

const request = async <TResponse, T>(configs: RequestParams<T>): Promise<TResponse | any> => {
   const { method, url, params, data, options = null } = configs;
   try {
      const response = await instance.request({
         method,
         url,
         data,
         params,
         options: options ? options : null,
      });
      return response.data;
   } catch (err: any) {
      if (err?.response?.data?.validator) {
         err.response.data.formattedErrors = formatValidatorErrors(err?.response.data);
         console.log('err.response.data.formattedErrors', err.response.data.formattedErrors);
         console.log('err?.response.data', err?.response.data);

         if (err?.response.data?.message.includes('Token já desabilitado')) {
            if (typeof window === 'undefined') {
               redirect('/login');
            } else {
               // await signOut();
            }
         }
      }

      throw new Error(err?.response.data?.message || 'Ocorreu um erro', {
         cause: err?.response?.data,
      });
   }
};
const get = async <TResponse = any, TParams extends Record<string, any> | null = any>(url: string, params?: TParams, options?: Options): Promise<TResponse> => {
   return request<TResponse, TParams>({ method: 'GET', url, params, options });
};

const post = async <TResponse = any, TData extends Record<string, any> = any>(url: string, data: TData, options?: Options): Promise<TResponse> => {
   return request<TResponse, TData>({ method: 'POST', url, data, options });
};

const put = async <TResponse, TData extends Record<string, any>>(url: string, data: TData, options?: Options): Promise<TResponse> => {
   return request<TResponse, TData>({ method: 'PUT', url, data, options });
};

const del = async <TResponse, TData>(url: string, data: TData, options?: Options): Promise<TResponse> => {
   return request<TResponse, TData>({ method: 'DELETE', url, data, options });
};

const api = { get, post, put, delete: del };
export default api;

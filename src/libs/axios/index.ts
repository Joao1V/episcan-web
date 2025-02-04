import axios from 'axios';

import { API_HEADER_MAIN } from './headers';
import { showLoadingToast, updateToast } from './toast';
import { AdditionalConfig, Options, RequestParams } from './types';
import { isClient, isServer } from './utils/constants';
import { formatValidatorErrors } from './utils/formatValidator';
import { getToken } from './utils/token';
import { redirect } from 'next/navigation';

const instance = axios.create({
   baseURL: process.env.NEXT_PUBLIC_API_BASE_URL_MAIN,
   headers: API_HEADER_MAIN,
});

// EXECUTA ANTES DO REQUEST
instance.interceptors.request.use(async (config: AdditionalConfig) => {
   if (config.method !== 'get' && isClient) {
      showLoadingToast('Carregando...');
   }
   const token = await getToken();

   config.headers['userToken'] = token || config?.userToken;

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

const request = async <T, TResponse>(configs: RequestParams<T>): Promise<TResponse> => {
   const { method, url, params, data, options = null } = configs;
   try {
      const response = await instance.request({
         method,
         url,
         params,
         data,
         ...options,
      } as AdditionalConfig);
      return response.data;
   } catch (err: any) {
      if (err?.response?.data?.validator) {
         console.log('Estou no validator', err.response.data.formattedErrors);
         err.response.data.formattedErrors = formatValidatorErrors(err?.response.data);

         if (err?.response.data?.message.includes('Token já desabilitado')) {
            typeof window === 'undefined' && redirect('/login')
         }
      }

      throw new Error(err?.response.data?.message || 'Ocorreu um erro', {
         cause: err?.response?.data,
      });
   }
};
const get = async <TResponse>(url: string, params?: any, options?: Options): Promise<TResponse> => {
   return request({ method: 'GET', url, params, options });
};

const post = async <T, TResponse>(url: string, data: T, options?: Options): Promise<TResponse> => {
   return request({ method: 'POST', url, data, options });
};

const put = async <T, TResponse>(url: string, data: T, options?: Options): Promise<TResponse> => {
   return request({ method: 'PUT', url, data, options });
};

const del = async <T, TResponse>(url: string, data: T, options?: Options): Promise<TResponse> => {
   return request({ method: 'DELETE', url, data, options });
};

const api = { get, post, put, delete: del };
export default api;

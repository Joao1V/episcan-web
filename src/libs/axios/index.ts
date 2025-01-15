import axios from 'axios';

import { API_HEADER_MAIN } from './headers';
import { showLoadingToast, updateToast } from './toast';
import { AdditionalConfig, Options, RequestParams } from './types';

const isServer = typeof window === 'undefined';

const instance = axios.create({
   baseURL: process.env.NEXT_PUBLIC_API_BASE_URL_MAIN,
   headers: API_HEADER_MAIN,
});

// EXECUTA ANTES DO REQUEST
instance.interceptors.request.use((config: AdditionalConfig) => {
   if (config.method !== 'get' && !isServer) {
      showLoadingToast('Carregando...');
   }

   return config;
});
//CAPTURA A RESPOSTA
instance.interceptors.response.use(
   (config) => {
      if (isServer) {
         return config;
      }

      updateToast({
         type: 'success',
         message: 'Realizado com sucesso',
      });
      return config;
   },
   (err) => {
      updateToast({
         type: 'error',
         message: 'Ops, ocorreu um erro!',
      });

      return Promise.reject(err);
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
      const error: any = new Error(err?.response.data?.message || 'Ocorreu um erro');
      error.response = err.response;
      throw error;
   }
};
const get = async <TResponse>(url: string, params?: any, options?: Options): Promise<TResponse> => {
   return request({ method: 'GET', url, params, options });
};

const post = async <T, TResponse>(url: string, data?: T, options?: Options): Promise<TResponse> => {
   return request({ method: 'POST', url, data, options });
};

const put = async <T, TResponse>(url: string, data?: T, options?: Options): Promise<TResponse> => {
   return request({ method: 'PUT', url, data, options });
};

const del = async <T, TResponse>(url: string, data?: T, options?: Options): Promise<TResponse> => {
   return request({ method: 'DELETE', url, data, options });
};

const api = { get, post, put, delete: del };
export default api;

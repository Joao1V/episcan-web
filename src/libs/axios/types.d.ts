import { InternalAxiosRequestConfig, Method } from 'axios';

export type Options = {
   isClub?: boolean;
   isDisableToast?: boolean;
};

export type AdditionalConfig = InternalAxiosRequestConfig & {
   options?: Options | null;
};

export type RequestParams<T> = {
   method: Method;
   url: string;
   params?: any;
   data?: T;
   options?: Options | null;
};

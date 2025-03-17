import { AxiosRequestHeaders, InternalAxiosRequestConfig, Method, AxiosRequestConfig } from 'axios';

export type Options = {
   isDisableToast?: boolean;
   userToken?: string;
};

export type RequestParams<T> = {
   method: Method;
   url: string;
   params?: any;
   data?: T;
   options?: Options | null;
};

export type Validator = {
   [key: string]: string[];
};

export type ErrorResponse = {
   HTTPStatus: number;
   executed: boolean;
   message: string;
   userToken: string;
   validator: Validator;
   object: Record<string, unknown>;
   formatted_errors?: FormattedErrors;
};

export type FormattedErrors = {
   [key: string]: string;
};

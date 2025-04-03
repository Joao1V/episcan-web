import { Method } from 'axios';

export type Options = {
   isDisableToast?: boolean;
   userToken?: string;
   nextApi?: boolean;
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
export type ResponsePaginate<T> = {
   current_page: number;
   data: T;
   first_page_url: string;
   from: number;
   last_page: number;
   last_page_url: string;
   links: {
      url: string | null;
      label: string;
      active: boolean;
   }[];
   next_page_url: string | null;
   path: string;
   per_page: number;
   prev_page_url: string | null;
   to: number;
   total: number;
};

export type PaginateResponse<T> = {
   HTTPStatus: number;
   executed: boolean;
   message: string;
   object: ResponsePaginate<T>;
};


export type FormattedErrors = {
   [key: string]: string;
};

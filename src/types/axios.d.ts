import 'axios';
import { Options } from '@/libs/axios/types';

declare module 'axios' {
   export interface AxiosRequestConfig {
      options?: Options | null;
   }
}

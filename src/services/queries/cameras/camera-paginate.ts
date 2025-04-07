'use client';

import { useGetData } from '@/hooks';
import { QUERY_KEYS } from '@/services/queries/queryKeys';
import type { ResponsePaginate } from '@/libs/axios/types';
import type { CameraVerification } from '@/services/queries/cameras';
export function useCameraPaginate() {

   return useGetData<ResponsePaginate<CameraVerification[]>>({
      queryKey: [QUERY_KEYS.CAMERAS.PAGINATE],
      url: '/restrict/camera/paginate',
      onSuccess: (response) => response.object,
   });
}

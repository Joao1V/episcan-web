'use client';

import { useGetData } from '@/hooks';
import { QUERY_KEYS } from '@/services/queries/queryKeys';
export function useCameraPaginate() {

   return useGetData({
      queryKey: [QUERY_KEYS.CAMERAS_PAGINATE],
      url: '/restrict/camera/paginate',
      onSuccess: (response) => response.object,
   });
}

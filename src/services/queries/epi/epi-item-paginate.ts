import { useGetData } from '@/hooks';
import { QUERY_KEYS } from '@/services/queries/queryKeys';

export function useEpiPaginate() {
   return useGetData({
      queryKey: [QUERY_KEYS.EPIS_PAGINATE],
      url: 'restrict/epi-item/paginate',
      onSuccess: (response) => response.object,
   });
}
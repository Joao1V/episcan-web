import { QUERY_KEYS } from '@/services/queries/queryKeys';

import type { OptionsPaginate, CameraVerification } from './types';
import { useGetData, usePaginate } from '@/hooks';
import { ResponsePaginate } from '@/libs/axios/types';

type CameraVerificationPaginate = {
   search_suspected_infraction?: 0 | 1;
};
export function useCameraVerificationPaginate(
   monitoredCompanyIdentifier: string,
   options: OptionsPaginate<CameraVerificationPaginate>,
) {
   const { filterKey } = options;

   const { paginate } = usePaginate<CameraVerificationPaginate>(filterKey, {
      initialFilters: {
         page: 1,
         limit: 10,
         search_suspected_infraction: 1,
         ...options?.initialFilters,
      },
   });

   return useGetData<ResponsePaginate<CameraVerification[]>>({
      queryKey: [QUERY_KEYS.CAMERA_VERIFICATION_PAGINATE(monitoredCompanyIdentifier), paginate],
      filterKey: filterKey,
      url: `restrict/monitored-company/${monitoredCompanyIdentifier}/camera-verification/paginate`,
      params: paginate,
      enabled: !!paginate,
      isKeepPrevious: options?.isKeepPrevious,
      onSuccess: (response) => response.object,
   });
}

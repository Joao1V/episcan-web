import { QUERY_KEYS } from '@/services/queries/queryKeys';

import type { OptionsPaginate, CameraVerification } from './types';
import { useGetData, usePaginate } from '@/hooks';
import { ResponsePaginate } from '@/libs/axios/types';
import moment from 'moment-timezone';

type CameraVerificationPaginate = {
   search_suspected_infraction?: 0 | 1;
   search_start_date: string;
};
export function useCameraVerificationPaginate(
   monitoredCompanyIdentifier: string,
   options: OptionsPaginate<CameraVerificationPaginate>,
) {
   const { filterKey } = options;

   const { paginate } = usePaginate<CameraVerificationPaginate>(filterKey, {
      initialFilters: {
         page: 1,
         limit: 50,
         search_suspected_infraction: 1,
         search_start_date: moment().format('YYYY-MM-DD'),
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

import type { Summary } from '@/services/queries/dashboard';
import { QUERY_KEYS } from '@/services/queries/queryKeys';

import { useGetData } from '@/hooks';

export function useDashboardSummary(monitoredCompanyIdentifier: string) {
   return useGetData<Summary>({
      queryKey: [QUERY_KEYS.DASHBOARD_SUMMARY, monitoredCompanyIdentifier],
      url: `restrict/monitored-company/${monitoredCompanyIdentifier}/dashboard/summary`,
      params: {
         // start_date: moment().startOf('month').format('YYYY-MM-DD'),
         // end_date: moment().endOf('month').format('YYYY-MM-DD'),
         start_date: '2025-03-01',
         end_date: '2025-03-30',
      },
      onSuccess: (response) => response.object,
   });
}

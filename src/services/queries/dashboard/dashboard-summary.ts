import { useGetData } from '@/hooks';
import { QUERY_KEYS } from '@/services/queries/queryKeys';
import moment from 'moment';

export function useDashboardSummary(monitoredCompanyIdentifier: string) {
   return useGetData({
      queryKey: [QUERY_KEYS.DASHBOARD_SUMMARY, monitoredCompanyIdentifier],
      url: `restrict/monitored-company/${monitoredCompanyIdentifier}/dashboard/summary`,
      params: {
         start_date: moment().startOf('month').format('YYYY-MM-DD'),
         end_date: moment().endOf('month').format('YYYY-MM-DD'),
      },
      onSuccess: (response) => response.object,
   });
}

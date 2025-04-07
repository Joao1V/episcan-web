'use client';

import { CardVerificationStats } from '@/features/(panel)/dashboard/card-verification-stats';
import { LineChart } from '@/features/(panel)/dashboard/line-chart';
import { PieDetectionDepartmentChart } from '@/features/(panel)/dashboard/pie-detection-department-chart';



import { useDashboardSummary } from '@/services/queries/dashboard';
import { useMonitoredCompany } from '@/services/queries/monitored-company';





export default function Page() {
   const { data: monitoredCompany } = useMonitoredCompany();

   const { data: summary, isLoading, isError } = useDashboardSummary(monitoredCompany?.identifier);

   if (isLoading && !summary) return <>Loading</>;

   if (isError) return <>Error</>;
   return (
      <div>
         <div className="mb-5">
            <CardVerificationStats
               stats={[
                  {
                     key: 'verification',
                     label: 'Total de Verificações',
                     icon: 'check-circle',
                     value: summary?.verification_count_in_period,
                  },
                  {
                     key: 'daily',
                     label: 'Média Diária',
                     icon: 'abstract-2',
                     value: summary?.average_daily_detection_in_period,
                  },
                  {
                     key: 'customer',
                     label: 'Usuários',
                     icon: 'user',
                     value: summary?.customer_count,
                  },
                  {
                     key: 'cameras',
                     label: 'Total de Câmeras',
                     icon: 'instagram',
                     type: '',
                     value: summary?.cameras_active_count + summary?.cameras_inactive_count,
                  },
                  {
                     key: 'total',
                     label: 'Detectado Hoje',
                     icon: 'faceid',
                     value: 30,
                  },
               ]}
            />
         </div>
         <div>
            <div className={'card card-flush'}>
               <div className="card-header pt-5">
                  <h4 className="card-title align-items-start flex-column">
                     <span className="card-label fw-bold text-gray-900">Detecções por setor</span>
                  </h4>
                  {/*<div className="card-toolbar">*/}
                  {/*   <span className="badge badge-light-danger fs-base mt-n3">*/}
                  {/*      <i className="ki-outline ki-arrow-down fs-5 text-danger ms-n1" />*/}
                  {/*      7.4%*/}
                  {/*   </span>*/}
                  {/*</div>*/}
               </div>
               <div className={'card-body'}>
                  <div className={'mb-5'}>
                        <LineChart data={summary.line_chart_department_detections_in_period} />
                  </div>

                     <PieDetectionDepartmentChart data={summary?.detection_count_by_department} />
               </div>
            </div>
         </div>
      </div>
   );
}

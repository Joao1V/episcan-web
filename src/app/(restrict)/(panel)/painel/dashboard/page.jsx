'use client';

import dynamic from 'next/dynamic';

import { CardVerificationStats } from '@/features/(panel)/dashboard/card-verification-stats';
import { LineChart } from '@/features/(panel)/dashboard/line-chart';
import PieDetectionDepartmentChart from '@/features/(panel)/dashboard/pie-detection-department-chart';
import { TableLatestOccurrences } from '@/features/(panel)/table/table-latest-occurrences';
import {
   useDashboardCameraVerificationPaginate,
   useDashboardSummary,
} from '@/services/queries/dashboard';
import { useMonitoredCompany } from '@/services/queries/monitored-company';

export default function Page() {
   const { data: monitoredCompany } = useMonitoredCompany();

   const { data: summary, isLoading } = useDashboardSummary(monitoredCompany?.identifier);

   if (isLoading) return <>Loading</>;

   return (
      <div>
         <div className={'card'}>
            <div className={'card-header'}>
               <h4 className="card-title align-items-start flex-column">
                  <span className="card-label fw-bold text-gray-900">Ultimas ocorrencias</span>
               </h4>
            </div>
            <div className="card-body">
               <TableLatestOccurrences companyIdentifier={monitoredCompany.identifier} />
            </div>
         </div>
         {/*<div className={'row mb-10'}>*/}
         {/*   <div className="col-12 col-md-5">*/}
         {/*      <CardVerificationStats*/}
         {/*         count={{*/}
         {/*            verification: summary?.verification_count_in_period,*/}
         {/*            daily: summary?.detection_count_in_period,*/}
         {/*         }}*/}
         {/*      />*/}
         {/*      <div className="d-flex">*/}
         {/*         <div className={'card card-flush'}>*/}
         {/*            <div className="card-header pt-5">*/}
         {/*               <h4 className="card-title align-items-start flex-column">*/}
         {/*                  <span className="card-label fw-bold text-gray-900">Detecções</span>*/}
         {/*               </h4>*/}
         {/*               <div className="card-toolbar">*/}
         {/*                  <span className="badge badge-light-danger fs-base mt-n3">*/}
         {/*                     <i className="ki-outline ki-arrow-down fs-5 text-danger ms-n1" />*/}
         {/*                     7.4%*/}
         {/*                  </span>*/}
         {/*               </div>*/}
         {/*            </div>*/}
         {/*            <div className={'card-body'}>*/}
         {/*               <div className={'d-flex justify-content-between'}>*/}
         {/*                  <div>*/}
         {/*                     {summary?.detection_count_by_department.map((detection, index) => (*/}
         {/*                        <div*/}
         {/*                           className="d-flex fs-7 fw-semibold align-items-center"*/}
         {/*                           key={index}*/}
         {/*                        >*/}
         {/*                           <div*/}
         {/*                              className="bullet bg-success me-3"*/}
         {/*                              style={{ borderRadius: 3, width: 12, height: 12 }}*/}
         {/*                           />*/}
         {/*                           <div className="fs-6 fw-bold text-gray-600 me-5">*/}
         {/*                              {detection.title}*/}
         {/*                           </div>*/}
         {/*                           <div className="ms-auto fw-bolder text-gray-700 text-end">*/}
         {/*                              {detection.total}*/}
         {/*                           </div>*/}
         {/*                        </div>*/}
         {/*                     ))}*/}
         {/*                  </div>*/}

         {/*                  <PieDetectionDepartmentChart*/}
         {/*                     data={summary?.detection_count_by_department}*/}
         {/*                  />*/}
         {/*               </div>*/}
         {/*            </div>*/}
         {/*            /!*<div className="card-header">*!/*/}
         {/*            /!*   <div className="card-title">*!/*/}
         {/*            /!*      Detecções*!/*/}
         {/*            /!*   </div>*!/*/}
         {/*            /!*</div>*!/*/}
         {/*            /!*<div className={'card-body'}>*!/*/}
         {/*            /!*   {summary?.detection_count_by_department?.map((detection, index) => {*!/*/}
         {/*            /!*      return (*!/*/}
         {/*            /!*         <div key={index}>*!/*/}
         {/*            /!*            <h4>{detection.total}</h4>*!/*/}
         {/*            /!*            <p>{detection.title}</p>*!/*/}
         {/*            /!*         </div>*!/*/}
         {/*            /!*      );*!/*/}
         {/*            /!*   })}*!/*/}
         {/*            /!*</div>*!/*/}
         {/*         </div>*/}
         {/*      </div>*/}
         {/*   </div>*/}
         {/*   <div className="col-md-7">*/}
         {/*      {typeof window !== 'undefined' && (*/}
         {/*         <div className="card card-p-0 mb-5">*/}
         {/*            <div className={'card-body'}>*/}
         {/*               <LineChart data={summary.line_chart_detections_in_period} />*/}
         {/*            </div>*/}
         {/*         </div>*/}
         {/*      )}*/}
         {/*      <div className="row flex-center gy-5 ">*/}
         {/*         <div className="col-sm-6 col-lg-4 ">*/}
         {/*            <div className="card h-lg-100">*/}
         {/*               <div className="card-body d-flex justify-content-between align-items-start flex-column">*/}
         {/*                  <div className="m-0">*/}
         {/*                     <i className="ki-outline ki-compass fs-2hx text-gray-600" />*/}
         {/*                  </div>*/}
         {/*                  <div className="d-flex flex-column my-7">*/}
         {/*                     <span className="fw-semibold fs-2x text-gray-800 lh-1 ls-n2">*/}
         {/*                        202*/}
         {/*                     </span>*/}
         {/*                     <div className="m-0">*/}
         {/*                        <span className="fw-semibold fs-6 text-gray-500">*/}
         {/*                           Funcionários*/}
         {/*                        </span>*/}
         {/*                     </div>*/}
         {/*                  </div>*/}
         {/*               </div>*/}
         {/*            </div>*/}
         {/*         </div>*/}
         {/*         <div className="col-sm-6 col-lg-4">*/}
         {/*            <div className="card h-lg-100">*/}
         {/*               <div className="card-body d-flex justify-content-between align-items-start flex-column">*/}
         {/*                  <div className="m-0">*/}
         {/*                     <i className="ki-outline ki-chart-simple fs-2hx text-gray-600" />*/}
         {/*                  </div>*/}
         {/*                  <div className="d-flex flex-column my-7">*/}
         {/*                     <span className="fw-semibold fs-2x text-gray-800 lh-1 ls-n2">23</span>*/}
         {/*                     <div className="m-0">*/}
         {/*                        <span className="fw-semibold fs-6 text-gray-500">Cameras</span>*/}
         {/*                     </div>*/}
         {/*                  </div>*/}
         {/*               </div>*/}
         {/*            </div>*/}
         {/*         </div>*/}

         {/*         <div className="col-sm-6 col-lg-4">*/}
         {/*            <div className="card h-lg-100">*/}
         {/*               <div className="card-body d-flex justify-content-between align-items-start flex-column">*/}
         {/*                  <div className="m-0">*/}
         {/*                     <i className="ki-outline ki-chart-simple fs-2hx text-gray-600" />*/}
         {/*                  </div>*/}
         {/*                  <div className="d-flex flex-column my-7">*/}
         {/*                     <span className="fw-semibold fs-2x text-gray-800 lh-1 ls-n2">4</span>*/}
         {/*                     <div className="m-0">*/}
         {/*                        <span className="fw-semibold fs-6 text-gray-500">Setores</span>*/}
         {/*                     </div>*/}
         {/*                  </div>*/}
         {/*               </div>*/}
         {/*            </div>*/}
         {/*         </div>*/}
         {/*      </div>*/}
         {/*   </div>*/}
         {/*</div>*/}

      </div>
   );
}

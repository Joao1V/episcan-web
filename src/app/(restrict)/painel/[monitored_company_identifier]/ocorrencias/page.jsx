'use client';
import { TableLatestOccurrences } from '@/features/(panel)/table/table-latest-occurrences';
import { useMonitoredCompany } from '@/services/queries/monitored-company';

export default function Page() {
   const { data: monitoredCompany } = useMonitoredCompany();


   return (
      <div>
         <div className={'card'}>
            <div className={'card-header'}>
               <h4 className="card-title align-items-start flex-column">
                  <span className="card-label fw-bold text-gray-900">Últimas Ocorrências</span>
               </h4>
            </div>
            <div className="card-body">
               <TableLatestOccurrences companyIdentifier={monitoredCompany.identifier} />
            </div>
         </div>
      </div>
   );
}
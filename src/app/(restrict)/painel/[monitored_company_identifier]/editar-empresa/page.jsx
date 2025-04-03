'use client';

import { FormMonitoredCompany } from '@/features/(panel)/forms/form-monitored-company';

export default function Page() {

   return (
      <div>
         <div className="card">
            <div className="card-header">
               <div className="card-title">
                  Editar empresa
               </div>
            </div>
            <div className={'card-body'}>
               <FormMonitoredCompany mode={'edit'}/>
            </div>
         </div>
      </div>
   );
}

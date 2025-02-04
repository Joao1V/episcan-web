'use client';

import { FormCreateSector } from '@/features/(panel)/forms/form-create-sector';
import { useMonitoredCompany } from '@/services/queries/monitored-company/monitored-company-controller';
import { useFormBuilder } from 'form-builder';
import api from 'api';
import { useMutation } from '@tanstack/react-query';
import { useOrganization } from '@/services/queries/organization';

export default function Page() {
   const {data: monitoredCompany } = useMonitoredCompany();
   const { data: organization } = useOrganization();


   return (
      <div className={'card'}>
         <div className={'card-header'}>
            <div className="card-title">
               <h3>Novo setor</h3>
            </div>
         </div>
         <div className={'card-body'}>
            <FormCreateSector />
         </div>
      </div>
   );
}

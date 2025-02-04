import { FormCreateMonitoredCompany } from '@/features/(panel)/forms/form-create-monitored-company';

export default function Page() {
   return (
      <div className={'card'}>
         <div className={'card-header'}>
            <div className="card-title">
               <h3>Criar Empresa</h3>
            </div>
         </div>
         <div className={'card-body'}>
            <FormCreateMonitoredCompany />
         </div>
      </div>
   );
}

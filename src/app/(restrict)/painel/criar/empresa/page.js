import { FormMonitoredCompany } from '@/features/(panel)/forms/form-monitored-company';

export default function Page() {
   return (
      <div className={'card mt-5'}>
         <div className={'card-header'}>
            <div className="card-title">
               <h3>Criar Empresa</h3>
            </div>
         </div>
         <div className={'card-body'}>
            <FormMonitoredCompany mode={'create'}/>
         </div>
      </div>
   );
}

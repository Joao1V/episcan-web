import FormCreateOrganization from '@/features/(panel)/forms/form-create-organization';

export default function Page() {
   return (
      <div className={'card'}>
         <div className={'card-header'}>
            <div className="card-title">
               <h3>Criar organização</h3>
            </div>
         </div>
         <div className={'card-body'}>
            <FormCreateOrganization />
         </div>
      </div>
   );
}

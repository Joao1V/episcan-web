'use client';

import { Button } from '@components/ui';
import { KTIcon } from 'kt-icon';

import { ModalAddNewSector } from '@/features/(panel)/modal/modal-add-new-sector';
import { MODAL_PANEL_KEYS } from '@/features/(panel)/modal/modalKeys';
import { useModal } from '@/hooks';
import { useDepartmentList } from '@/services/queries/departament';
import { useMonitoredCompany } from '@/services/queries/monitored-company';
import { useOrganization, useOrganizationUsersPaginate } from '@/services/queries/organization';

export default function Page() {
   const { data: monitoredCompany } = useMonitoredCompany();
   const { data: organization } = useOrganization();
   const { data: organizationUsers } = useOrganizationUsersPaginate(organization.identifier);
   const { data: department, refetch, isLoading } = useDepartmentList(monitoredCompany.identifier);
   const { setModal } = useModal(MODAL_PANEL_KEYS.ADD_NEW_SECTOR);

   return (
      <>
         <ModalAddNewSector />
         <div>
            <div className="d-flex flex-wrap flex-stack mb-6">
               <h3 className="fw-bold my-2 fs-5">
                  Setores
                  <span className="fs-7 text-gray-500 fw-semibold ms-1">
                     ({department?.length})
                  </span>
               </h3>

               <div className="d-flex flex-wrap my-2">
                  <Button onClick={() => setModal(true)} variant={'primary'}>
                     <KTIcon name={'plus'} className={'fs-6'} />
                     Novo setor
                  </Button>
               </div>
            </div>
            <div className={'row row-cols-auto'}>
               {!isLoading &&
                  department &&
                  department?.length > 0 &&
                  department.map((item, index) => (
                     <div className={'col'} key={index}>
                        <div className={'card'}>
                           <div className={'card-header'}>
                              <h4 className="card-title">{item.title}</h4>
                           </div>
                           <div className="card-body">
                              <p className={'mb-0'}>Criado em: {item.created_at}</p>
                           </div>
                        </div>
                     </div>
                  ))}
            </div>
         </div>
      </>
   );
}

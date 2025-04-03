'use client';

import { Button } from '@components/ui';
import { KTIcon } from 'kt-icon';

import { ModalCamera } from '@/features/(panel)/modal/modal-camera';
import { MODAL_PANEL_KEYS } from '@/features/(panel)/modal/modalKeys';
import { TableCompanyCameras } from '@/features/(panel)/table/table-company-cameras';
import { useModal } from '@/hooks';
import { useCameraPaginate } from '@/services/queries/cameras';

export default function Page() {
   const { setModal } = useModal(MODAL_PANEL_KEYS.ADD_CAMERA);
   const { data } = useCameraPaginate();

   return (
      <>
         <ModalCamera />
         <div>
            <div className="d-flex flex-wrap flex-stack mb-6">
               <h3 className="fw-bold my-2 fs-5">
                  Câmeras
                  <span className="fs-7 text-gray-500 fw-semibold ms-1">({data?.total || ''})</span>
               </h3>

               <div className="d-flex flex-wrap my-2">
                  <Button onClick={() => setModal(true)} variant={'primary'}>
                     <KTIcon name={'plus'} className={'fs-6'} />
                     Adicionar
                  </Button>
               </div>
            </div>

            <div className="card">
               <div className="card-body">
                  <TableCompanyCameras />
               </div>
            </div>
         </div>
      </>
   );
}

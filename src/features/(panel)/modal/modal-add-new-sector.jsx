import { ModalBuilder } from '@components/ui';

import { FormAddNewSector } from '@/features/(panel)/forms/form-add-new-sector';
import { MODAL_PANEL_KEYS } from '@/features/(panel)/modal/modalKeys';
import { useModal } from '@/hooks';
import { useDepartmentList } from '@/services/queries/departament';
import { useMonitoredCompany } from '@/services/queries/monitored-company';

export function ModalAddNewSector() {
   const { isShow, setModal } = useModal(MODAL_PANEL_KEYS.ADD_NEW_SECTOR);

   const { data: monitoredCompany } = useMonitoredCompany();
   const { data: department, refetch, isLoading } = useDepartmentList(monitoredCompany.identifier);

   return (
      <ModalBuilder title={'Novo setor'} show={isShow} setModal={setModal}>
         <FormAddNewSector
            onSuccess={async () => {
               await refetch();
            }}
         />
      </ModalBuilder>
   );
}

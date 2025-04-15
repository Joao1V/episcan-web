import { ModalBuilder } from '@components/ui';

import { useModal } from '@/hooks';
import { MODAL_PANEL_KEYS } from '@/features/(panel)/modal/modalKeys';
import { TableOrganizationInvites } from '@/features/(panel)/table/table-organization-invites';

export function ModalOrganizationInviteUser() {
   const { setModal, isShow } = useModal(MODAL_PANEL_KEYS.INVITE_USER);


   return (
      <ModalBuilder show={isShow} setModal={setModal} title={'Convites'}>
         <TableOrganizationInvites/>
      </ModalBuilder>
   );
}

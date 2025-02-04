import { ModalBuilder } from '@components/ui';

import { useModal } from '@/hooks';
import { TableOrganizationInvites } from '@/features/(panel)/table/table-organization-invites';
import { MODAL_ORGANIZATION_KEYS } from '@/features/(panel)/modal/modalKeys';

export function ModalOrganizationInviteUser() {
   const { setModal, isShow } = useModal(MODAL_ORGANIZATION_KEYS.INVITE_USER);


   return (
      <ModalBuilder show={isShow} setModal={setModal} title={'INVITES'}>
         <TableOrganizationInvites/>
      </ModalBuilder>
   );
}

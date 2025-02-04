'use client';

import { Modal } from 'react-bootstrap';

import { Button, ModalBuilder } from '@components/ui';
import { useMutation } from '@tanstack/react-query';
import api from 'api';

import { MODAL_ORGANIZATION_KEYS } from '@/features/(panel)/modal/modalKeys';
import { useModal } from '@/hooks';
import { useSession } from 'next-auth/react';

export function ModalAcceptInvitationOrganization() {
   const {data: session } = useSession();
   const { setModal, isShow } = useModal(MODAL_ORGANIZATION_KEYS.INVITATION_ORGANIZATION, {
      initialShow: true,
   });

   const { mutateAsync: handleAcceptInvitation, isPending } = useMutation({
      mutationFn: async () => {
         const inviteIdentifier = session.user?.organization_invites[0].identifier;

         console.log(inviteIdentifier);
         // return await api.post(`restrict/organization-invite/${inviteIdentifier}/accept-invite`, null);
      },
   });

   return (
      <ModalBuilder
         show={isShow}
         backdrop={'static'}
         setModal={setModal}
      >
         <div>
            <h4 className={'mb-10 text-center'}>Voce recebeu um convite</h4>
         </div>
         <div className={'d-flex gap-2 flex-center'}>
            <Button variant={'outline-danger'}>Recusar</Button>
            <Button disabled={isPending} onClick={async () => {
               await handleAcceptInvitation();
            }}>Aceitar</Button>
         </div>
      </ModalBuilder>
   );
}

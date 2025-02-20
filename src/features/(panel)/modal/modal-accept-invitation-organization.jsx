'use client';

import { Modal } from 'react-bootstrap';

import { Button, ModalBuilder } from '@components/ui';
import { useMutation } from '@tanstack/react-query';
import api from 'api';

import { MODAL_PANEL_KEYS } from '@/features/(panel)/modal/modalKeys';
import { useModal } from '@/hooks';
import { useSession } from 'next-auth/react';
import { useOrganizationPaginate } from '@/services/queries/organization/organization-paginate';
import { useMonitoredCompany, useMonitoredCompanyPaginate } from '@/services/queries/monitored-company';
import { useRouter } from 'next/navigation';

export function ModalAcceptInvitationOrganization() {
   const {data: session } = useSession();
   const {isShow, setModal} = useModal(MODAL_PANEL_KEYS.INVITATION_ORGANIZATION, {
      initialShow: true,
   });
   const organizationPaginate= useOrganizationPaginate();
   const monitoredCompany = useMonitoredCompanyPaginate();
   const router = useRouter();


   const { mutateAsync: handleAcceptInvitation, isPending } = useMutation({
      mutationFn: async () => {
         const inviteIdentifier = session.user?.organization_invites[0].identifier;

         await api.post(`restrict/organization-invite/${inviteIdentifier}/accept-invite`, null);
         await organizationPaginate.refetch();
         await monitoredCompany.refetch();
         router.replace('/painel/dashboard');
      },
   });

   return (
      <ModalBuilder
         show={isShow}
         backdrop={'static'}
         setModal={setModal}
      >
         <div>
            <h4 className={'mb-10 text-center'}>Você recebeu um convite para fazer parte da organização <span className={'text-uppercase'}>{session?.user?.organization_invites[0].organization.description}</span></h4>
         </div>
         <div className={'d-flex gap-2 flex-center'}>
            <Button disabled={isPending} variant={'outline-danger'}>Recusar</Button>
            <Button disabled={isPending} onClick={async () => {
               await handleAcceptInvitation();
            }}>Aceitar</Button>
         </div>
      </ModalBuilder>
   );
}

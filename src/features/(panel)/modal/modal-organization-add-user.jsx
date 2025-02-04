import { ModalBuilder } from '@components/ui';
import { useMutation } from '@tanstack/react-query';
import api from 'api';
import FormBuilder from 'form-builder';
import * as yup from 'yup';

import { useModal } from '@/hooks';
import { useOrganizationInvitePaginate } from '@/services/queries/organization/organization-invite-paginate';
import { MODAL_ORGANIZATION_KEYS } from '@/features/(panel)/modal/modalKeys';

export function ModalOrganizationAddUser(props) {
   const { setModal, isShow } = useModal(MODAL_ORGANIZATION_KEYS.ADD_USER);
   const { refetch } = useOrganizationInvitePaginate({enabled: false});


   const { mutateAsync: onSubmit, isPending } = useMutation({
      mutationFn: async (payload) => {
         return await api.post('/restrict/organization-invite', payload);
      },
      onSuccess: refetch,
   });

   return (
      <ModalBuilder show={isShow} title={'Convidar usuário'} setModal={setModal}>
         <FormBuilder
            defaultValues={{
               organization_identifier: props.organizationIdentifier,
            }}
            onSubmit={onSubmit}
            config={{
               col: 'col-12',
               fields: [
                  {
                     type: 'email',
                     accessor: 'invite_email',
                     label: 'Insira o email',
                     placeholder: 'Digite aqui...',
                  },
                  {
                     type: 'radio',
                     accessor: 'invite_role',
                     label: 'Selecione o cargo',
                     options: [
                        {
                           label: 'Admin',
                           value: 'ADMIN',
                        },
                        {
                           label: 'Gestor',
                           value: 'MANAGER',
                        },
                        {
                           label: 'Visualizador',
                           value: 'VIEWER',
                        },
                     ],
                  },
                  {
                     type: 'submit',
                     text: 'Enviar convite',
                     // isFetching: isPending,
                  },
               ],
            }}
         />
      </ModalBuilder>
   );
}

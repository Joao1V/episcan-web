import { Button } from '@components/ui';

import { useOrganizationInvitePaginate } from '@/services/queries/organization/organization-invite-paginate';
import { USER_PERMISSION_ROLE } from '@/helpers/constants';
import { useMutation } from '@tanstack/react-query';
import api from 'api';
import { TableBuilder } from '@/libs/table-builder';
import { clsx } from 'clsx';

export function TableOrganizationInvites() {
   const { data: invites, isFetching, isLoading, isEmptyData, refetch } = useOrganizationInvitePaginate();

   const {mutate: onRevokeInvite, isPending} = useMutation({
      mutationFn: async (variables: any) => {
         console.log(variables?.identifier);

         await api.delete(`/restrict/organization-invite/${variables?.identifier}`, null);
      },
      onSuccess: refetch,
   });


   if (isLoading)
      return (
         <div>
            <p>Carregando, um momento...</p>
         </div>
      );

   if (isEmptyData) return (
      <div>
         <h5 className={'text-center fw-normal'}>Convide usuários para sua empresa</h5>
      </div>
   );

   return (
      <TableBuilder
         data={invites?.data || []}
         columns={[
            {
               accessorKey: 'invite_email',
               header: 'Email',
               cell: ({ cell, row, getValue }) => {
                  return getValue();
               },
            },
            {
               accessorKey: 'invite_role',
               header: 'Cargo',
               cell: ({getValue}) => {
                  const role = getValue() as keyof typeof USER_PERMISSION_ROLE;
                  return (
                     <span className="badge badge-light-info fw-bold px-4 py-3">
                        {USER_PERMISSION_ROLE[role]}
                     </span>
                  );
               },
            },
            {
               accessorKey: 'used_at',
               header: 'Status',
               cell: ({getValue}) => {
                  const label = getValue() ? 'ACEITO' : 'PENDENTE';

                  return (
                     <span className={clsx('badge badge-sm', {
                        'badge-success': getValue() !== null,
                        'badge-warning': getValue() === null,
                     })}>
                        {label}
                     </span>
                  );
               },
            },
            {
               id: 'actions',
               header: 'Ações',
               cell: ({ row }) => (
                  <div className={'d-inline-block'}>

                     <Button
                        className={'btn-icon-danger btn p-0'}
                        disabled={isPending || isFetching || row.original.used_at !== null }
                        onClick={() => {
                           onRevokeInvite(row.original);
                        }}
                        tooltip={{
                           content: 'Remover convite',
                           anchorSelect: `#revok-invite-${row.id}`,
                        }}
                     >
                        <i className={'fas fa-user-times'}></i>
                     </Button>
                  </div>
               ),
            },
         ]}
      />
   );
}

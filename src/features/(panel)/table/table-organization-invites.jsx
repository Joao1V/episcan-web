import { Button } from '@components/ui';

import { useOrganization } from '@/services/queries/organization';
import { useOrganizationInvitePaginate } from '@/services/queries/organization/organization-invite-paginate';
import { USER_PERMISSION_ROLE } from '@/helpers/constants';
import { useMutation } from '@tanstack/react-query';
import api from 'api';

export function TableOrganizationInvites() {
   const { data: invites, isFetching, isLoading, isEmptyData, refetch } = useOrganizationInvitePaginate();

   const {mutate: onRevokeInvite, isPending} = useMutation({
      mutationFn: async (variables) => {
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
         <h4 className={'text-center fw-normal'}>Convide usuários para sua empresa</h4>
      </div>
   );
   return (
      <table className="table table-row-bordered table-row-dashed gy-4 align-middle fw-bold dataTable w-100">
         <colgroup>
            <col data-dt-column={0} style={{ width: '323.188px' }} />
            <col data-dt-column={1} style={{ width: '193.906px' }} />
            <col data-dt-column={4} style={{ width: '86.5312px' }} />
         </colgroup>
         <thead className="fs-8 text-gray-500 text-uppercase">
            <tr>
               <th
                  className="min-w-250px dt-orderable-asc dt-orderable-desc"
                  data-dt-column={0}
                  rowSpan={1}
                  colSpan={1}
                  tabIndex={0}
               >
                  <span className="dt-column-title" role="button">
                     Email
                  </span>
                  <span className="dt-column-order" />
               </th>
               <th
                  className="min-w-90px dt-orderable-asc dt-orderable-desc"
                  data-dt-column={3}
                  rowSpan={1}
                  colSpan={1}
                  tabIndex={0}
               >
                  <span className="dt-column-title" role="button">
                     Cargo
                  </span>
                  <span className="dt-column-order" />
               </th>
               <th
                  className="min-w-50px text-end dt-orderable-none"
                  data-dt-column={4}
                  rowSpan={1}
                  colSpan={1}
               >
                  <span className="dt-column-title">Ações</span>
                  <span className="dt-column-order" />
               </th>
            </tr>
         </thead>
         <tbody className="fs-7">
            {invites?.data?.map((user, index) => {
               return (
                  <tr key={index}>
                     <td>
                        <div className="d-flex align-items-center">
                           <div className="d-flex flex-column justify-content-center">
                              <span className="mb-1 text-gray-800 text-hover-primary">
                                 {user.invite_email}
                              </span>
                              <div className="fw-semibold fs-7 text-gray-500">
                                 {user.contact_mail}
                              </div>
                           </div>
                        </div>
                     </td>
                     <td>
                        <span className="badge badge-light-info fw-bold px-4 py-3">
                           {USER_PERMISSION_ROLE[user.invite_role]}
                        </span>
                     </td>
                     <td className="text-end">
                        <Button
                           className={'btn-reset link-danger'}
                           disabled={isPending || isFetching}
                           onClick={() => onRevokeInvite(user)}
                           tooltip={{
                              content: 'Remover convite',
                              anchorSelect: `#revok-invite-${index}`,
                           }}
                        >
                           <i className={'fas fa-user-times'}></i>
                        </Button>
                     </td>
                  </tr>
               );
            })}
         </tbody>
         <tfoot />
      </table>
   );
}

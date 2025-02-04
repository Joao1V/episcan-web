import { useOrganization, useOrganizationUsersPaginate } from '@/services/queries/organization';
import { USER_PERMISSION_ROLE } from '@/helpers/constants';

export function TableOrganizationUsers() {
   const { data: organization } = useOrganization();
   const { data: users } = useOrganizationUsersPaginate(organization.identifier);
   return (
      <table
         id="kt_project_users_table"
         className="table table-row-bordered table-row-dashed gy-4 align-middle fw-bold dataTable"
         style={{ width: '100%' }}
      >
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
                     Nome
                  </span>
                  <span className="dt-column-order" />
               </th>
               <th
                  className="min-w-90px dt-orderable-asc dt-orderable-desc"
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
                  rowSpan={1}
                  colSpan={1}
                  aria-label="Details"
               >
                  <span className="dt-column-title">Ações</span>
                  <span className="dt-column-order" />
               </th>
            </tr>
         </thead>
         <tbody className="fs-7">
            {users?.data?.map((user, index) => {
               return (
                  <tr key={index}>
                     <td>
                        <div className="d-flex align-items-center">
                           <div className="d-flex flex-column justify-content-center">
                              <span className="mb-1 text-gray-800 text-hover-primary">
                                 {user.name}
                              </span>
                              <div className="fw-semibold fs-7 text-gray-500">
                                 {user.contact_mail}
                              </div>
                           </div>
                        </div>
                     </td>
                     <td>
                        <span className="badge badge-light-info fw-bold px-4 py-3">
                           {USER_PERMISSION_ROLE[user.permission_role]}
                        </span>
                     </td>
                     <td className="text-end">
                        <div className="btn btn-light btn-sm">View</div>
                     </td>
                  </tr>
               );
            })}
         </tbody>
         <tfoot />
      </table>
   );
}

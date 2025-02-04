'use client';

import {
   MODAL_ORGANIZATION_KEYS
} from '@/features/(panel)/modal/modalKeys';
import { ModalOrganizationAddUser } from '@/features/(panel)/modal/modal-organization-add-user';
import { ModalOrganizationInviteUser } from '@/features/(panel)/modal/modal-organization-invites';
import { TableOrganizationUsers } from '@/features/(panel)/table/table-organization-users';

import { useOrganization } from '@/services/queries/organization';
import { useOrganizationUsersPaginate } from '@/services/queries/organization/organization-users-paginate';
import { useModal } from '@/hooks';

export default function Page() {
   const { data: organization } = useOrganization();
   const { data: organizationUsers } = useOrganizationUsersPaginate(
      organization.identifier,
   );
   const modalOrganizationAddUser = useModal(MODAL_ORGANIZATION_KEYS.ADD_USER);
   const modalOrganizationInviteUser = useModal(MODAL_ORGANIZATION_KEYS.INVITE_USER);

   return (
      <div className="row g-8">
         <div className="col-12">
            <div className={'d-flex align-items-center justify-content-between'}>
               <div className={'d-flex align-items-center'}>
                  <h5 className="fw-bold me-5 my-1">Usuários ({organizationUsers?.total})</h5>
                  <div className="d-flex align-items-center position-relative my-1">
                     <i className="ki-outline ki-magnifier fs-5 position-absolute ms-3" />
                     <input
                        type="text"
                        className="form-control form-control-sm border-body bg-body w-200px ps-10"
                        placeholder="Digite para buscar..."
                     />
                  </div>
               </div>
               <div className="d-flex flex-wrap my-1">
                  <button
                     className="btn btn-sm btn-light btn-color-muted btn-active-primary"
                     tabIndex={-1}
                     onClick={() => modalOrganizationInviteUser.setModal(true)}
                  >
                     <i className="fa fa-users " />
                     Convites
                  </button>
                  <button
                     className="btn btn-sm btn-light btn-color-muted btn-active-primary"
                     tabIndex={-1}
                     onClick={() => modalOrganizationAddUser.setModal(true)}
                  >
                     <i className="fa fa-user-plus " />
                     Adicionar usuário
                  </button>
               </div>
               <ModalOrganizationInviteUser organizationIdentifier={organization.identifier} />
               <ModalOrganizationAddUser organizationIdentifier={organization.identifier} />
            </div>
         </div>

         <div className="col-12">
            <div className="card flex-grow-1">
               <div className="card-body pt-0">
                  <div className="table-responsive">
                     <div className="dt-container dt-bootstrap5 dt-empty-footer">
                        <div className="table-responsive">
                           <TableOrganizationUsers />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

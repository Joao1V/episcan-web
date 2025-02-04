import Link from 'next/link';
import { useParams } from 'next/navigation';

import { useMenu } from '@/features/(panel)/menu';

export function Toolbar(props) {
   const params = useParams();

   const { menu } = useMenu({
      type: ['company-profile', 'header'],
      params: {
         organizationIdentifier: params.organization_identifier,
      }
   });

   return (
      <div className="app-toolbar  py-6 ">
         <div
            id="kt_app_toolbar_container"
            className="app-container  container-xxl d-flex align-items-start "
         >
            <div className="d-flex flex-column flex-row-fluid">
               <div className="d-flex align-items-center pt-1">
                  <ul className="breadcrumb breadcrumb-separatorless fw-semibold">
                     <li className="breadcrumb-item text-white fw-bold lh-1">
                        <Link href={menu.basePath} className="text-white text-hover-primary">
                           <i className="ki-outline ki-home text-gray-700 fs-6" />{' '}
                        </Link>
                     </li>

                     <li className="breadcrumb-item">
                        <i className="ki-outline ki-right fs-7 text-gray-700 mx-n1" />{' '}
                     </li>

                     <li className="breadcrumb-item text-white fw-bold lh-1">
                        {menu?.active?.breadcrumb}
                     </li>
                  </ul>
               </div>
               <div className="d-flex flex-stack flex-wrap flex-lg-nowrap gap-4 gap-lg-10 pt-13 pb-6">
                  <div className="page-title me-5">
                     <h4 className="page-heading d-flex text-white fw-bold flex-column justify-content-center my-0">
                        {menu?.active?.title}

                        {menu?.active?.description && (
                           <span className="page-desc text-gray-600 fw-semibold fs-7 pt-3">
                              {menu?.active?.description}
                           </span>
                        )}
                     </h4>
                  </div>
                  {/*<div className="d-flex align-self-center flex-center flex-shrink-0">*/}
                  {/*   <a*/}
                  {/*      href="#"*/}
                  {/*      className="btn btn-flex btn-sm btn-outline btn-active-color-primary btn-custom px-4"*/}
                  {/*      data-bs-toggle="modal"*/}
                  {/*      data-bs-target="#kt_modal_invite_friends"*/}
                  {/*   >*/}
                  {/*      <i className="ki-outline ki-plus-square fs-4 me-2" /> Invite*/}
                  {/*   </a>*/}
                  {/*   <a*/}
                  {/*      href="#"*/}
                  {/*      className="btn btn-sm btn-active-color-primary btn-outline btn-custom ms-3 px-4"*/}
                  {/*      data-bs-toggle="modal"*/}
                  {/*      data-bs-target="#kt_modal_new_target"*/}
                  {/*   >*/}
                  {/*      Set Your Target*/}
                  {/*   </a>*/}
                  {/*</div>*/}
               </div>
            </div>
         </div>
      </div>
   );
}

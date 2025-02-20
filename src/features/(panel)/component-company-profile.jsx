'use client';

import logo from '@images/next.svg';
import Image from 'next/image';
import Link from 'next/link';

import { clsx } from 'clsx';
import { KTIcon } from 'kt-icon';

import { useMenu } from '@/features/(panel)/menu';
import { Dropdown } from '@/libs/dropdown-builder';
import { Masks } from '@/libs/form-builder/utils/masks';
import { useMonitoredCompany } from '@/services/queries/monitored-company';
import { useOrganization } from '@/services/queries/organization';
import { Button } from '@components/ui';
import { usePathname } from 'next/navigation';

export function ComponentCompanyProfile() {
   const { data: organization } = useOrganization();
   const { data: monitoredCompany } = useMonitoredCompany();

   const { menu } = useMenu({
      type: ['company-profile'],
      params: {
         organizationIdentifier: organization.identifier,
      },
   });
   if (Object.keys(organization).length > 0 && Object.keys(monitoredCompany).length > 0) return (
      <div className="card card-flush h-lg-100">
         <div className="card-body pt-5 pb-0">
            <div className="d-flex flex-wrap flex-sm-nowrap mb-6">
               <div className="d-flex flex-center flex-shrink-0 bg-light rounded w-100px h-100px w-lg-150px h-lg-150px me-7 mb-4">
                  <Image className="mw-50px mw-lg-75px" src={logo} alt="image" />
               </div>

               <div className="flex-grow-1">
                  <div
                     className={'d-flex justify-content-between align-items-start flex-wrap mb-2'}
                  >
                     <div className={'mb-3'}>
                        <h4 className={'mb-2'}>{monitoredCompany?.name}</h4>
                        <p className={'text-muted fs-sm'}>
                           {Masks.formatCnpj(monitoredCompany?.cpfcnpj)}
                        </p>

                        <div className="d-flex flex-wrap fw-semibold fs-7 mb-4 pe-2">
                           <p className="d-flex align-items-center text-gray-500 text-hover-primary me-5 mb-2 ">
                              <KTIcon
                                 type={'outline'}
                                 name={'profile-user'}
                                 className={'fs-5 me-1'}
                              />{' '}
                              {organization?.name}
                           </p>

                           <p className="d-flex align-items-center text-gray-500 text-hover-primary mb-2">
                              <KTIcon type={'outline'} name={'sms'} className={'fs-5 me-1'} />{' '}
                              {monitoredCompany?.contact_mail}
                           </p>
                        </div>
                     </div>
                     <div className="d-flex my-4">
                        <a
                           href="#"
                           className="btn btn-sm btn-light me-2"
                           id="kt_user_follow_button"
                        >
                           <i className="ki-outline ki-check fs-3 d-none" />
                           <span className="indicator-label">Follow</span>
                           <span className="indicator-progress">
                              Please wait...{' '}
                              <span className="spinner-border spinner-border-sm align-middle ms-2" />
                           </span>
                        </a>
                        <Button variant={'primary'} size={'sm'}>
                           Editar
                        </Button>
                     </div>
                  </div>
               </div>
            </div>

            {/*<ul className={'nav nav-pills nav-pills-custom mb-3'}>*/}
            {/*   <li className="nav-item mb-3" role="presentation">*/}
            {/*      <Link*/}
            {/*         className="nav-link d-flex flex-center overflow-hidden w-80px h-85px"*/}
            {/*         href={'#'}*/}
            {/*         role="tab"*/}
            {/*      >*/}
            {/*         <div className="nav-icon">*/}
            {/*            <i className="ki-outline ki-plus-square fs-2 text-gray-500" />*/}
            {/*         </div>*/}
            {/*         <span className="bullet-custom position-absolute bottom-0 w-100 h-4px bg-primary" />*/}
            {/*      </Link>*/}
            {/*   </li>*/}
            {/*</ul>*/}
            <ul className="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-6 fw-bold">
               {menu.routes.map((route, index) => (
                  <li className="nav-item " key={index}>
                     <Link
                        className={clsx('nav-link text-active-primary ms-0 me-10 py-5 ', {
                           active: route.active,
                        })}
                        href={menu.basePath + route.href}
                     >
                        {route.name}
                     </Link>
                  </li>
               ))}
            </ul>
         </div>
      </div>
   );
}

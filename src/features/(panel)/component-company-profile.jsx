'use client';

import Link from 'next/link';

import { clsx } from 'clsx';

import { useMenu } from '@/features/(panel)/menu';
import { useMonitoredCompany } from '@/services/queries/monitored-company/monitored-company-controller';
import { useOrganization } from '@/services/queries/organization';
import { Masks } from '@/libs/form-builder/utils/masks';

export function ComponentCompanyProfile() {
   const { data: organization } = useOrganization();
   const { data: monitoredCompany } = useMonitoredCompany();

   const { menu } = useMenu({
      type: ['company-profile'],
      params: {
         organizationIdentifier: organization.identifier,
      },
   });

   return (
      <div className="card card-flush h-lg-100">
         <div className="card-header pt-5">
            <h3 className="card-title align-items-start flex-column">
               <span className="card-label fw-bold text-gray-900">
                  Organização: <span className={'text-uppercase'}>{organization?.name}</span>
               </span>
            </h3>
         </div>
         <div className="card-body pt-5 pb-0">
            <div>
               <h4>Empresa: {monitoredCompany?.name}</h4>
               <p>{Masks.formatCnpj(monitoredCompany?.cpfcnpj)}</p>
               <p>{monitoredCompany?.contact_mail}</p>
            </div>
            <ul className={'nav nav-pills nav-pills-custom mb-3'}>
               <li className="nav-item mb-3" role="presentation">
                  <Link
                     className="nav-link d-flex flex-center overflow-hidden w-80px h-85px"
                     href={'#'}
                     role="tab"
                  >
                     <div className="nav-icon">
                        <i className="ki-outline ki-plus-square fs-2 text-gray-500" />
                     </div>
                     <span className="bullet-custom position-absolute bottom-0 w-100 h-4px bg-primary" />
                  </Link>
               </li>
            </ul>
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

'use client';

import Link from 'next/link';

import { clsx } from 'clsx';

import { useMenu } from '@/features/(panel)/menu/index';
import { useOrganization } from '@/services/queries/organization';

export function MenuOptions() {
   const { data: organization } = useOrganization();

   const { menu } = useMenu({
      type: ['company-profile'],
      params: {
         organizationIdentifier: organization?.identifier,
      },
   });
   return (
      <div className="card card-flush h-lg-100 mt-3">
         <div className="card-body py-0">
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

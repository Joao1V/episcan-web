'use client';

import Link from 'next/link';
import { useMenu } from '@/features/(panel)/menu';
import { useParams } from 'next/navigation';

const Breadcrumb =  () => {
   const params = useParams();

   const { menu } = useMenu({
      type: ['company-profile', 'header'],
      params: {
         organizationIdentifier: params.organization_identifier,
      }
   });

   return (
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
   );
};
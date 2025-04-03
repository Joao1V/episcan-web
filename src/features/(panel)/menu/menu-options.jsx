'use client';

import React from 'react';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { clsx } from 'clsx';
import { KTIcon } from 'kt-icon';

import { useMenu } from '@/features/(panel)/menu/index';
import { Dropdown } from '@/libs/dropdown-builder';
import { useMonitoredCompanyPaginate } from '@/services/queries/monitored-company';

export function MenuOptions() {
   const { data: monitoredCompanyPaginate } = useMonitoredCompanyPaginate();
   const { monitored_company_identifier } = useParams();

   const { menu } = useMenu({
      type: ['company-profile'],
      params: {
         monitored_company_identifier,
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

               {monitoredCompanyPaginate.data.length > 1 && (
                  <li className={'nav-item flex-grow-1 justify-content-end'}>
                     <Dropdown trigger={'hover'}>
                        <Dropdown.Toggle className={'nav-link  ms-0 me-10  h-100'}>
                           <KTIcon name={'arrow-right-left'} type={'solid'} />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                           {monitoredCompanyPaginate?.data?.map((item, index) => (
                              <Dropdown.Item
                                 href={`/painel/${item.identifier}/dashboard`}
                                 key={index}
                              >
                                 {item.name}
                              </Dropdown.Item>
                           ))}
                        </Dropdown.Menu>
                     </Dropdown>
                  </li>
               )}
            </ul>
         </div>
      </div>
   );
}

'use client';

import logo from '@images/next.svg';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, usePathname, useRouter } from 'next/navigation';

import { useQueryClient } from '@tanstack/react-query';
import { KTIcon } from 'kt-icon';
import { ArrowLeft } from 'lucide-react';

import { Dropdown } from '@/libs/dropdown-builder';
import { Masks } from '@/libs/form-builder/utils/masks';
import { useMonitoredCompany } from '@/services/queries/monitored-company';
import { useOrganization } from '@/services/queries/organization';
import { usePermissions } from '@/services/queries/permissions/permissions';

const menuCreate = [
   {
      path: '/painel/criar/organizacao',
      title: 'Olá, seja bem-vindo!',
   },
   {
      path: '/painel/criar/empresa',
      title: 'Falta pouco! Agora, vamos criar a empresa para sua organização',
   },
];
export function Toolbar() {
   const queryClient = useQueryClient();

   const { data: monitoredCompany } = useMonitoredCompany();
   const { data: organization } = useOrganization();
   const permissions = usePermissions();

   const pathname = usePathname();
   const params = useParams();
   const router = useRouter();
   const _signOut = async () => {
      try {
         await signOut({ redirect: true });
         await queryClient.clear();
      } catch (e) {}
   };

   return (
      <div className="app-toolbar  py-6 ">
         <div
            id="kt_app_toolbar_container"
            className="app-container  container-xxl d-flex align-items-start "
         >
            <div className="d-flex flex-column flex-row-fluid">
               {(permissions.rules.hasMonitoredCompany && menuCreate.some((i) => i.path.includes(pathname))) &&
                  <div>
                     <button
                        onClick={() => router.back()}
                        className="btn btn-sm btn-bg-light bg-hover-gray-300 d-flex flex-center gap-1"
                     >
                        <ArrowLeft size={14} />
                        Voltar
                     </button>
                  </div>
               }

               <div className="d-flex justify-content-between flex-wrap flex-lg-nowrap gap-4 gap-lg-10 pt-10 ">
                  {(
                     permissions.rules?.hasOrganization &&
                     !menuCreate.some((i) => i.path.includes(pathname))
                  ) ?
                     <>
                        <div className="d-flex flex-wrap flex-sm-nowrap gap-7">
                           <div className="d-flex flex-center position-relative flex-shrink-0 bg-light rounded w-100px h-100px w-lg-150px h-lg-150px">
                              <Image fill={true} src={'/images/fake-logo.png'} alt="image" />
                           </div>

                           <div className="flex-grow-1">
                              <div
                                 className={
                                    'd-flex justify-content-between align-items-start flex-wrap mb-2'
                                 }
                              >
                                 <div className={'mb-3'}>
                                    <h4 className={'mb-2 text-primary'}>
                                       {monitoredCompany?.name}
                                    </h4>
                                    <p className={'text-white-50 fs-sm'}>
                                       {Masks.formatCnpj(monitoredCompany?.cpfcnpj)}
                                    </p>

                                    <div className="d-flex flex-wrap fw-semibold fs-7 mb-4 pe-2">
                                       <p className="d-flex align-items-center text-white-50 text-hover-primary me-5 mb-2 ">
                                          <KTIcon
                                             type={'outline'}
                                             name={'profile-user'}
                                             className={'fs-5 me-1'}
                                          />{' '}
                                          {organization?.name}
                                       </p>

                                       <p className="d-flex align-items-center text-white-50 text-hover-primary mb-2">
                                          <KTIcon
                                             type={'outline'}
                                             name={'sms'}
                                             className={'fs-5 me-1'}
                                          />{' '}
                                          {monitoredCompany?.contact_mail}
                                       </p>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>

                        <div className={'d-flex'}>
                           <div>
                              <Link
                                 href={`/painel/${params.monitored_company_identifier}/editar-empresa`}
                                 className="btn btn-flex btn-sm btn-outline btn-active-color-primary btn-custom px-4"
                              >
                                 <KTIcon
                                    name={'user-edit'}
                                    type={'outline'}
                                    className={'fs-5 me-2'}
                                 />
                                 Editar
                              </Link>
                           </div>
                           <Dropdown>
                              <Dropdown.Toggle className="btn btn-sm btn-active-color-primary btn-outline btn-custom ms-3 ">
                                 <KTIcon
                                    name={'dots-vertical'}
                                    type={'solid'}
                                    className={'fs-4 p-0'}
                                 />
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                 <Dropdown.Item href={'/painel/criar/empresa'}>
                                    Nova empresa
                                 </Dropdown.Item>
                                 <Dropdown.Item onClick={_signOut}>Sair</Dropdown.Item>
                              </Dropdown.Menu>
                           </Dropdown>
                        </div>
                     </>
                  :  <>
                        {menuCreate.map(
                           (item, index) =>
                              item.path.includes(pathname) && (
                                 <div key={index}>
                                    <h3 className={'text-white'}>{item.title}</h3>
                                 </div>
                              ),
                        )}
                     </>
                  }
               </div>
            </div>
         </div>
      </div>
   );
}

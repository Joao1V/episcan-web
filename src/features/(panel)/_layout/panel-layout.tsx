'use client';

import { ReactNode, useEffect } from 'react';

import { setCookie } from 'cookies-next';
import { useSession } from 'next-auth/react';
import { notFound, useParams, usePathname, useRouter } from 'next/navigation';

import { Footer } from '@/features/(panel)/_layout/footer';
import { Toolbar } from '@/features/(panel)/_layout/toolbar';
import { MenuOptions } from '@/features/(panel)/menu/menu-options';
import { ModalAcceptInvitationOrganization } from '@/features/(panel)/modal/modal-accept-invitation-organization';
import { useMonitoredCompanyPaginate } from '@/services/queries/monitored-company';
import { useOrganizationPaginate } from '@/services/queries/organization';
import { usePermissions } from '@/services/queries/permissions';
import { COOKIES_KEYS } from '@/services/queries/queryKeys';

export function PanelLayout({ children }: { children: ReactNode }) {
   const { data: session } = useSession();
   const pathname = usePathname();
   const router = useRouter();

   const params = useParams<{monitored_company_identifier: string}>();
   const { data: organizationPaginate } = useOrganizationPaginate();
   const { data: monitoredCompanyPaginate } = useMonitoredCompanyPaginate();
   const permissions = usePermissions({
      initialValue: {
         hasOrganization: organizationPaginate.data.length > 0,
         hasMonitoredCompany: monitoredCompanyPaginate.data.length > 0,
         hasInvite: !!session?.user?.organization_invites?.some(({ used_at }) => used_at === null),
      },
   });

   const isValidIdentifier = monitoredCompanyPaginate.data.some(
      (i) => i.identifier === params.monitored_company_identifier,
   );

   useEffect(() => {
      setCookie(COOKIES_KEYS.ORGANIZATION.ACTIVE, {
         organization: {
            identifier: organizationPaginate?.data[0]?.identifier,
            monitored_company: monitoredCompanyPaginate.data.map((i) => ({
               identifier: i.identifier,
            })),
         },
      });

      if (!permissions.rules.hasOrganization) {
         router.replace('/painel/criar/organizacao');
      } else if (!permissions.rules.hasMonitoredCompany) {
         router.replace('/painel/criar/empresa');
      } else if (permissions.rules.hasMonitoredCompany) {
         let companyIdentifier =
            params.monitored_company_identifier || monitoredCompanyPaginate.data[0].identifier;

         const pathnameSplit = pathname.split('/');
         if (pathnameSplit.length < 4) {
            router.replace(`/painel/${companyIdentifier}/dashboard`);
         }
      }

   }, []);

   if (!isValidIdentifier && params.monitored_company_identifier) {
      notFound();
   }

   if (permissions.rules.hasInvite) {
      return <ModalAcceptInvitationOrganization />;
   }

   if (pathname !== '/painel')
      return (
         <div className={'d-flex flex-column flex-root app-root'}>
            <div className="app-page  flex-column flex-column-fluid ">
               <div className="app-wrapper  flex-column flex-row-fluid ">
                  <Toolbar />
                  <div className={'app-container  container-xxl '}>
                     <main className="app-main flex-column flex-row-fluid ">
                        <div className={'d-flex flex-column flex-column-fluid'}>
                           <div className={'app-content'}>
                              {params.monitored_company_identifier &&
                                 <div className="col-sm-12 mb-5 mb-xl-10">
                                    <MenuOptions />
                                 </div>
                              }


                              {children}
                           </div>
                        </div>
                        <Footer />
                     </main>
                  </div>
               </div>
            </div>
         </div>
      );
}

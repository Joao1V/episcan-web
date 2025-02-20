'use client';

import { useEffect } from 'react';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { Footer } from '@/features/(panel)/_layout/footer';
import { Header } from '@/features/(panel)/_layout/header';
import { Toolbar } from '@/features/(panel)/_layout/toolbar';
import { ModalAcceptInvitationOrganization } from '@/features/(panel)/modal/modal-accept-invitation-organization';
import { useOrganization, useOrganizationPaginate } from '@/services/queries/organization';

export function PanelLayout({ children }) {
   const { data: session } = useSession();
   const { data: organizationPaginate } = useOrganizationPaginate();
   const router = useRouter();

   useEffect(() => {
      // if (organizationPaginate?.data?.length === 0 && session?.user?.organization_invites?.length === 0) {
      //    router.replace('/painel/criar-organizacao');
      // }
   }, []);

   if (session?.user?.organization_invites?.some(({ used_at }) => used_at === null)) {
      return <ModalAcceptInvitationOrganization />;
   }

   return (
      <div className={'d-flex flex-column flex-root app-root'}>
         <div className="app-page  flex-column flex-column-fluid ">
            <Header />

            <div className="app-wrapper  flex-column flex-row-fluid ">
               <Toolbar />
               <div className={'app-container  container-xxl '}>
                  <main className="app-main flex-column flex-row-fluid ">
                     <div className={'d-flex flex-column flex-column-fluid'}>
                        <div className="app-content  flex-column-fluid ">{children}</div>
                     </div>
                     <Footer />
                  </main>
               </div>
            </div>
         </div>
      </div>
   );
}

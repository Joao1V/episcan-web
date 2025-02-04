'use client';

import { useSession } from 'next-auth/react';

import { Footer } from '@/features/(panel)/_layout/footer';
import { Header } from '@/features/(panel)/_layout/header';
import { Toolbar } from '@/features/(panel)/_layout/toolbar';
import { ModalAcceptInvitationOrganization } from '@/features/(panel)/modal/modal-accept-invitation-organization';

export function PanelLayout({ children }) {
   const { data: session } = useSession();

   if (session?.user?.organization_invites?.length > 0) {
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
                  </main>
               </div>
            </div>

            <Footer />
         </div>
      </div>
   );
}

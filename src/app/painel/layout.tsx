import { ReactNode } from 'react';

import { AuthenticatedLayout } from '@/components/layout/authenticated-layout';

export default async function Layout({ children }: { children: ReactNode }) {
   return <AuthenticatedLayout>{children}</AuthenticatedLayout>;
}

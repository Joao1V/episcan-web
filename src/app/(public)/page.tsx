import Link from 'next/link';
import { redirect } from 'next/navigation';

export default function Page() {
   redirect('/login');

   return (
      <>
         <h3 className={'ff-secondary'}>
             Home page
         </h3>
         <Link href={'/login'}>Ir para painel</Link>
      </>
   );
}
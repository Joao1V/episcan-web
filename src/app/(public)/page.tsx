'use client';


import Link from 'next/link';

export default function Page() {

   return (
      <>
         <h3 className={'ff-secondary'}>
             Home page
         </h3>
         <Link href={'/painel'}>Ir para painel</Link>
      </>
   );
}
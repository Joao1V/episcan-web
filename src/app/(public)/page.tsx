'use client';

import { useState } from 'react';

export default function Page() {
   const [testando, setTestando] = useState();
   return (
      <>
         <h3 className={'ff-secondary'}>
             Home page
         </h3>
      </>
   );
}
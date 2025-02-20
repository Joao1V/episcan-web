'use client';

import React, { memo } from 'react';

import Link from 'next/link';

function CustomItem(props: any) {
   const { children, className, style, ref, labeledBy, onClick, href } = props;

   if (href) {
      return (
         <div className={'menu-item'}>
            <Link className={'menu-link'} href={href} onClick={onClick}>
               {children}
            </Link>
         </div>
      );
   }
   return (
      <div className={'menu-item '}>
         <button
            className={'btn w-100 menu-link'}
            ref={ref}
            style={style}
            aria-labelledby={labeledBy}
            onClick={onClick}
         >
            {children}
         </button>
      </div>
   );
}

export default memo(CustomItem);

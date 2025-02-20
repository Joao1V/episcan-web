'use client';

import React, { memo } from 'react';


function CustomToggle(props: any) {
   const { children, ref, onClick, className } = props;
   return (
      <div
         ref={ref}
         onClick={(e) => {
            e.preventDefault();
            onClick(e);
         }}
         className={className}
      >
         {children}
      </div>
   );
}

export default memo(CustomToggle);

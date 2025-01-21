import React from 'react';

export function Spinner() {
   return (
      <div className={'position-absolute end-0 bottom-0 top-0 d-flex flex-center me-3'}>
         <span className="spinner-border spinner-border-sm text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
         </span>
      </div>
   );
}

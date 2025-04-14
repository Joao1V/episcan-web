import React from 'react';
import Button from 'react-bootstrap/Button';

import Image from 'next/image';

import defaultImage from '@images/empty.svg';

interface ComponentsEmptyProps {
   image?: {
      src: string;
      style?: React.CSSProperties;
   };
   button?: {
      text: string;
      onClick: () => void;
      variant?: string;
   };
   title: string;
   subtitle?: string;
}

export const ComponentsEmpty = (props: ComponentsEmptyProps) => {
   const { image, title, subtitle, button } = props;

   return (
      <div className="d-flex justify-content-center align-items-center flex-column">
         <div className="d-flex flex-center">
            <div>
               <Image
                  src={image?.src || defaultImage}
                  alt="not-found"
                  style={{ height: 250, width: 'auto', ...image?.style }}
               />
            </div>
         </div>

         <div className="d-flex flex-column flex-center">
            <h3 className="my-3 w-75 text-primary text-center">{title}</h3>
            {subtitle && <span className="text-gray-700 w-100 text-center">{subtitle}</span>}
         </div>

         {button && (
            <div className="d-flex mt-4">
               <Button variant={button.variant || 'primary'} onClick={button.onClick}>
                  {button.text}
               </Button>
            </div>
         )}
      </div>
   );
};

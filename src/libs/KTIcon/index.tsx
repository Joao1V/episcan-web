import { FC } from 'react';

import icons from './icons';
import { IconName } from './types';

type KTIconProps = {
   name: IconName | string;
   type?: 'duotone' | 'solid' | 'outline';
   className?: string;
};

const KTIcon: FC<KTIconProps> = ({ className = '', type = 'duotone', name }) => {
   return (
      <i className={`ki-${type} ki-${name} ${className}`}>
         {type === 'duotone' &&
            [...Array(icons[name.trim()])].map((_e, i) => {
               return (
                  <span key={`${type}-${name}-path-${i + 1}`} className={`path${i + 1}`}></span>
               );
            })}
      </i>
   );
};

export { KTIcon };

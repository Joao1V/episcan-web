'use client';

import React, { memo, useContext, useRef } from 'react';
import { DropdownMenu } from 'react-bootstrap';

import { AnimatePresence, motion } from 'motion/react';

const menuDropdownVariants = {
   moveUp: (offset: number) => ({
      marginTop: 0,
      opacity: 1,
      transition: { duration: 0.2, ease: 'easeIn' },
   }),
   moveDown: (offset: number) => ({
      marginTop: offset,
      opacity: 0,
      transition: { duration: 0.2, ease: 'easeIn' },
   }),
};
function CustomMenu(props: any) {
   const { children, ref, show } = props;
   const translateRef = useRef(30);

   const transformYPx = () => {
      const match = props.style?.transform?.match(/translate\(\d+px,\s?(\d+)px\)/);
      if (match) {
         translateRef.current = parseInt(match[1], 10) + 20;
      }
      return match ? parseInt(match[1], 10) : translateRef.current;
   };

   return (
      <AnimatePresence >
         {show ? (
            <motion.div
               ref={ref}
               initial="moveDown"
               animate="moveUp"
               exit="moveDown"
               custom={12}
               variants={menuDropdownVariants}
               style={props.style}
               className={props.className + ' ' + 'menu-state-bg menu-gray-800 min-w-150px'}
               // data-popper-placement={props['data-popper-placement']}
            >
               {children}
            </motion.div>
         ) : null}
      </AnimatePresence>
   );
}

export default memo(CustomMenu);

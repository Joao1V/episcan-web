import * as React from 'react';

import { motion } from 'motion/react';

type FadeInProps = {
   children: React.ReactNode;
   step: number;
};
const FadeIn: React.FC<FadeInProps> = ({ children, step }) => {
   return (
      <motion.div
         key={step}
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
      >
         {children}
      </motion.div>
   );
};

export default FadeIn;

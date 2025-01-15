import * as React from 'react';

import WizardContext from './context/wizardContext';
import { WizardValues } from './types';

const useWizard = () => {
   const context = React.useContext(WizardContext);

   if (!context) {
      throw Error('Wrap your step with `Wizard`');
   } else {
      return context as WizardValues;
   }
};

export default useWizard;

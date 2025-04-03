import { ReactNode } from 'react';

import {
   CheckboxConfig,
   GoogleAutocompleteConfig,
   InputConfig,
   MaskedInputConfig,
   PhoneInputConfig,
   RadioConfig,
   SelectConfig,
   SelectFileConfig,
   SubmitConfig,
   TextareaConfig,
} from '../fields/types/index';
import * as yup from 'yup';

// Tipo básico para um Field
export type CommonFieldConfig = {
   accessor: string;
   rowLabelClass?: string;
   labelClass?: string;
   label: string | ReactNode;
   placeholder?: string;
   rule?: yup.StringSchema;
   required?: boolean;
   col?: string;
   isHorizontal?: boolean;
   helperInput?: string;
   ignore?: boolean;
   showIf?: {
      accessor: string | string[];
      value: string | number | ((value: any) => any);
   };
};

export type FormField =
   | GoogleAutocompleteConfig
   | SelectFileConfig
   | PhoneInputConfig
   | MaskedInputConfig
   | InputConfig
   | SelectConfig
   | SubmitConfig
   | RadioConfig
   | CheckboxConfig
   | TextareaConfig;

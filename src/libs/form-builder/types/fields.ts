import { ReactNode } from 'react';

import {
   EmailConfig,
   GoogleAutocompleteConfig,
   MaskedInputConfig,
   NumberConfig,
   PasswordConfig,
   PhoneInputConfig,
   RadioConfig,
   SelectConfig,
   SelectFileConfig,
   SubmitConfig,
   TextConfig,
   TextareaConfig,
} from '../fields/types/index';
import * as yup from 'yup';

// Tipo básico para um Field
export type CommonFieldConfig = {
   accessor: string;
   label: string | ReactNode;
   placeholder?: string;
   rule?: yup.StringSchema;
   col?: string;
   isHorizontal?: boolean;
   helperInput?: string;
   ignore?: boolean;
   showIf?: {
      accessor: string | string[];
      value: string | number | ((value: any) => any);
   };
};

export type CommonConfigInput = {
   addClassName?: string;
   disabled?: boolean;
};

export type FormField =
   | GoogleAutocompleteConfig
   | SelectFileConfig
   | PhoneInputConfig
   | MaskedInputConfig
   | TextConfig
   | PasswordConfig
   | EmailConfig
   | NumberConfig
   | SelectConfig
   | SubmitConfig
   | RadioConfig
   | TextareaConfig;

// Mapa entre literais de string e tipos de campo
export type FieldMappings = {
   'google-autocomplete': GoogleAutocompleteConfig;
   'select-file': SelectFileConfig;
   'phone-input': PhoneInputConfig;
   'number-format': MaskedInputConfig;
   text: TextConfig;
   password: PasswordConfig;
   email: EmailConfig;
   number: NumberConfig;
   select: SelectConfig;
   submit: SubmitConfig;
   radio: RadioConfig;
   textarea: TextareaConfig;
};

export type FieldType<T extends keyof FieldMappings> = FieldMappings[T];

export type FieldDefaultProps<T extends keyof FieldMappings> = {
   config: FieldType<T>;
};

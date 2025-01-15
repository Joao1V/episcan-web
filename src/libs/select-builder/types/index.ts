import {
   ControllerFieldState,
   ControllerRenderProps,
   FieldValues,
   UseFormStateReturn,
} from 'react-hook-form';

export interface OptionType {
   label: string;
   value: string | number;
}

export interface FieldControllerProps<TFieldValues extends FieldValues = FieldValues> {
   field: ControllerRenderProps<TFieldValues>;
   fieldState: ControllerFieldState;
   formState: UseFormStateReturn<TFieldValues>;
}

export type LabelValuePair = [label: string, value: string];

export interface SelectBuilderProps {
   options?: OptionType[];
   onChange?: (value: OptionType | null) => void;
   error?: any;
   accessorEdit?: string;
   url?: string;
   fieldController?: FieldControllerProps;
   keys?: LabelValuePair;
   isCreatable?: boolean;
   isClub?: boolean;
   isAsyncCreatable?: boolean;
   isAsync?: boolean;
   disableInitialSearch?: boolean;
   disableSearchQuery?: boolean;
   defaultValuesForm?: any;
   onClickOption?: (value: OptionType) => OptionType | Promise<OptionType>;
}

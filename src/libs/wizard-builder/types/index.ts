export type Handler = (() => Promise<void>) | (() => void) | null;

export type WizardProps = {
   animation?: 'fadeIn';
   menu?: {
      title?: string;
      description?: string;
   }[];

   /** Optional start index @default 0 */
   startIndex?: number;
   /**
    * Optional wrapper that is exclusively wrapped around the active step component. It is not wrapped around the `header` and `footer`
    * @example With `framer-motion` - `<AnimatePresence />`
    * ```jsx
    * <Wizard wrapper={<AnimatePresence exitBeforeEnter />}>
    * ...
    * </Wizard>
    * ```
    */
   wrapper?: React.ReactElement;
   /** Callback that will be invoked with the new step index when the wizard changes steps */
   onStepChange?: (stepIndex: number) => void;
};

export type WizardValues = {
   /** The current active step of the wizard */
   activeStep: number;
   /** The total number of steps of the wizard */
   totalStep: number;
   data: Data;
   wizardState: WizardState;
   actions: Actions;
};
type Data = {
   /** Data active step */
   active: Record<string, any>;
   /** All Data saved */
   cached: Record<string, Record<string, any>>;
};
type WizardState = {
   /**
    * Indicate the current state of the handler
    *
    * Will reflect the handler promise state: will be `true` if the handler promise is pending and
    * `false` when the handler is either fulfilled or rejected
    */
   isLoading: boolean;
   /** Indicate if the current step is the last step (aka no next step) */
   isLastStep: boolean;
   /** Indicate if the current step is the first step (aka no previous step) */
   isFirstStep: boolean;
};
type Actions = {
   /**
    * Go to the next step
    */
   nextStep: (data: any) => Promise<void>;
   /**
    * Go to the previous step
    */
   previousStep: () => void;
   /**
    * Go to the given step index
    * @param stepIndex The step index, starts at 0
    */
   goToStep: (stepIndex: number) => void;
   /**
    * Attach a callback that will be called when calling `nextStep()`
    * @param handler Can be either sync or async
    */
   handleStep?: (handler: Handler) => void;
};

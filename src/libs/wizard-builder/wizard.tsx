import * as React from 'react';

import { FadeIn } from './animation';
import Menu from './components/menu';
import WizardContext from './context/wizardContext';
import { Handler, WizardProps } from './types';

const Wizard: React.FC<React.PropsWithChildren<WizardProps>> = (props) => {
   const { children, onStepChange, startIndex = 0, menu, animation, wrapper: Wrapper } = props;
   const [activeStep, setActiveStep] = React.useState(startIndex);
   const [isLoading, setIsLoading] = React.useState(false);
   const hasNextStep = React.useRef(true);
   const hasPreviousStep = React.useRef(false);
   const nextStepHandler = React.useRef<Handler>(() => {});
   const [cachedData, setCachedData] = React.useState<Record<string, any>>({});
   const stepCount = React.Children.toArray(children).length;

   hasNextStep.current = activeStep < stepCount - 1;
   hasPreviousStep.current = activeStep > 0;

   const goToNextStep = React.useCallback(() => {
      if (hasNextStep.current) {
         const newActiveStepIndex = activeStep + 1;

         setActiveStep(newActiveStepIndex);
         onStepChange?.(newActiveStepIndex);
      }
   }, [activeStep, onStepChange]);

   const goToPreviousStep = React.useCallback(() => {
      if (hasPreviousStep.current) {
         nextStepHandler.current = null;
         const newActiveStepIndex = activeStep - 1;

         setActiveStep(newActiveStepIndex);
         onStepChange?.(newActiveStepIndex);
      }
   }, [activeStep, onStepChange]);

   const goToStep = React.useCallback(
      (stepIndex: number) => {
         if (stepIndex >= 0 && stepIndex < stepCount) {
            nextStepHandler.current = null;
            setActiveStep(stepIndex);
            onStepChange?.(stepIndex);
         } else {
         }
      },
      [stepCount, onStepChange],
   );

   // Callback to attach the step handler
   const handleStep = React.useRef((handler: Handler) => {
      nextStepHandler.current = handler;
   });

   const doNextStep = React.useCallback(
      async (data: any) => {
         if (hasNextStep.current) {
            try {
               setIsLoading(true);
               if (data?.type !== 'click') {
                  setCachedData({ ...cachedData, [activeStep]: data });
               }

               if (nextStepHandler.current) {
                  await nextStepHandler.current();
               }
               setIsLoading(false);
               nextStepHandler.current = null;
               goToNextStep();
            } catch (error) {
               setIsLoading(false);
               throw error;
            }
         } else {
            goToNextStep();
         }
      },
      [goToNextStep],
   );

   const wizardValue = React.useMemo(
      () => ({
         activeStep,
         totalStep: stepCount,
         data: {
            active: cachedData[activeStep],
            cached: cachedData,
         },
         wizardState: {
            isFirstStep: !hasPreviousStep.current,
            isLastStep: !hasNextStep.current,
            isLoading,
         },
         actions: {
            nextStep: doNextStep,
            previousStep: goToPreviousStep,
            handleStep: handleStep.current,
            goToStep,
         },
      }),
      [doNextStep, goToPreviousStep, isLoading, activeStep, stepCount, goToStep, cachedData],
   );

   const activeStepContent = React.useMemo(() => {
      const reactChildren = React.Children.toArray(children);

      return reactChildren[activeStep];
   }, [activeStep, children]);

   const enhancedActiveStepContent = React.useMemo(() => {
      switch (animation) {
         case 'fadeIn':
            return <FadeIn step={activeStep}>{activeStepContent}</FadeIn>;
         default:
            break;
      }
      if (Wrapper) {
         return React.cloneElement(Wrapper, {}, activeStepContent);
      }

      return activeStepContent;
   }, [Wrapper, activeStepContent]);

   return (
      <div className="stepper stepper-pills stepper-column d-flex flex-column flex-xl-row flex-row-fluid gap-10">
         {menu && (
            <Menu
               menuSteps={menu}
               stepCount={stepCount}
               goToStep={goToStep}
               activeStep={activeStep}
            />
         )}

         <WizardContext.Provider value={wizardValue}>
            <div data-kt-stepper-element={'content'} className={'current w-100'}>
               {enhancedActiveStepContent}
            </div>
         </WizardContext.Provider>
      </div>
   );
};

export default React.memo(Wizard);

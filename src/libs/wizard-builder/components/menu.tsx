import * as React from 'react';

import { KTIcon } from '@/libs/KTIcon';

interface MenuSteps {
   title?: string;
   description?: string;
}

interface MenuProps {
   menuSteps: MenuSteps[];
   stepCount: number;
   activeStep: number;
   goToStep: any;
}
export default function Menu(props: MenuProps) {
   const { menuSteps, stepCount, activeStep, goToStep } = props;
   const statusStep = (step: number) => {
      if (activeStep === step) {
         return 'current';
      } else if (activeStep > step) {
         return 'completed';
      } else {
         return 'pending';
      }
   };

   const onChangeStep = (i: number) => {
      if (i < activeStep) {
         goToStep(i);
      }
   };
   return (
      <div>
         <div
            style={{ top: 90 }}
            className="card d-flex justify-content-center justify-content-xl-start position-sticky flex-row-auto w-100 w-xl-300px w-xxl-400px"
         >
            <div>
               <div className="card-body py-5">
                  <ul className="stepper-nav nav flex-nowrap flex-md-wrap flex-row flex-md-column overflow-x-auto scroll-none gap-5 gap-md-0 pb-5 pb-md-0">
                     {menuSteps.map((item, index) => {
                        return (
                           <li key={index} className={'flex-column-fluid'} id={`step-${index + 1}`}>
                              <div
                                 data-kt-stepper-element={'nav'}
                                 className={`stepper-item ${statusStep(index)} flex-row flex-md-column align-items-center align-items-md-start justify-content-between gap-4 gap-md-0`}
                              >
                                 <div className="stepper-wrapper">
                                    <button
                                       type={'button'}
                                       className={`stepper-icon w-40px h-40px ${index > activeStep ? 'cursor-not-allowed' : ''}`}
                                       onClick={() => onChangeStep(index)}
                                    >
                                       <i className="stepper-check ki-duotone ki-check fs-5" />
                                       <span className="stepper-number">{index + 1}</span>
                                    </button>
                                    <div className="stepper-label">
                                       <h3 className="stepper-title">{item.title}</h3>
                                       <div className="stepper-desc fw-semibold">
                                          {item.description}
                                       </div>
                                    </div>
                                 </div>
                                 {index + 1 !== stepCount && (
                                    <>
                                       <div className="stepper-line d-none d-md-block h-40px" />
                                       <KTIcon
                                          name={'right'}
                                          className={'d-md-none'}
                                          type={'solid'}
                                       />
                                    </>
                                 )}
                              </div>
                           </li>
                        );
                     })}
                  </ul>
               </div>
            </div>
         </div>
      </div>
   );
}

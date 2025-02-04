import React, { JSX, ReactNode } from 'react';
import { Modal } from 'react-bootstrap';

interface ModalBuilderProps {
   title?: any;
   closeButton?: boolean;
   children: ReactNode;
   size?: 'sm' | 'lg' | 'xl';
   show: boolean;
   setModal: (show: boolean) => void;
   bodyClassName?: string;
   backdrop?: 'static';
   footer?: JSX.Element;
}

export const ModalBuilder: React.FC<ModalBuilderProps> = (props) => {
   const { title, children, size, show, setModal, bodyClassName, backdrop, footer } = props;
   return (
      <Modal size={size} show={show} onHide={() => setModal(false)} centered backdrop={backdrop}>
         {title && (
            <Modal.Header>
               {!backdrop && (
                  <div className={'position-absolute end-0 border-0 z-index-1 '}>
                     <button
                        type="button"
                        style={{ backgroundSize: 14, width: '2rem', height: '2rem' }}
                        onClick={() => setModal(false)}
                        className="btn-close m-0"
                        aria-label="Close"
                     ></button>
                  </div>
               )}
               <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
         )}
         <Modal.Body className={bodyClassName || ''}>{children}</Modal.Body>

         {footer && <Modal.Footer>{footer}</Modal.Footer>}
      </Modal>
   );
};

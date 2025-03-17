import React, { JSX, ReactNode, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';

interface ModalBuilderProps {
   title?: any;
   closeButton?: boolean;
   centered?: boolean;
   children: ReactNode;
   size?: 'sm' | 'lg' | 'xl';
   show: boolean;
   setModal: (show: boolean) => void;
   bodyClassName?: string;
   backdrop?: 'static';
   footer?: JSX.Element;
}

export const ModalBuilder: React.FC<ModalBuilderProps> = (props) => {
   const {
      title,
      children,
      size,
      show,
      centered = true,
      setModal,
      bodyClassName,
      backdrop,
      footer,
      closeButton,
   } = props;

   const [_showModal, setShowModal] = useState(show);

   useEffect(() => {
      setShowModal(true);
   }, [show]);
   return (
      <Modal
         size={size}
         show={show}
         onExited={() => {
            setShowModal(false);
         }}
         onHide={() => setModal(false)}
         centered={centered}
         backdrop={backdrop}
      >
         {(title || closeButton) && (
            <Modal.Header closeButton={!backdrop}>
               {/*{!backdrop && (*/}
               {/*   <div className={'position-absolute end-0 border-0 z-index-1 '}>*/}
               {/*      <button*/}
               {/*         type="button"*/}
               {/*         style={{ backgroundSize: 14, width: '2rem', height: '2rem' }}*/}
               {/*         onClick={() => setModal(false)}*/}
               {/*         className="btn-close m-0"*/}
               {/*         aria-label="Close"*/}
               {/*      ></button>*/}
               {/*   </div>*/}
               {/*)}*/}
               {title && <Modal.Title>{title}</Modal.Title>}
            </Modal.Header>
         )}
         {_showModal && <Modal.Body className={bodyClassName || ''}>{children}</Modal.Body>}

         {footer && <Modal.Footer>{footer}</Modal.Footer>}
      </Modal>
   );
};

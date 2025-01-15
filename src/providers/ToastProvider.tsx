'use client';

import React from 'react';
import { ToastContainer, Zoom } from 'react-toastify';

const ToastProvider = () => {
   return (
      <ToastContainer
         position="top-right"
         autoClose={4000}
         hideProgressBar
         newestOnTop={false}
         closeOnClick={false}
         rtl={false}
         pauseOnFocusLoss
         draggable
         pauseOnHover
         transition={Zoom}
      />
   );
};

export default ToastProvider;

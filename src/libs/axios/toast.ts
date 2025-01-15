import { Id, toast } from 'react-toastify';

export type ToastProps = {
   message: string;
   type: 'success' | 'error';
};

let toastId: Id | null = null;

export const showLoadingToast = (message: string) => {
   toastId = toast.loading(message, { autoClose: false, toastId: '1' });
};

export const updateToast = (options: ToastProps) => {
   const { message, type } = options;

   if (toastId) {
      toast.update(toastId, {
         render: message,
         type: type,
         autoClose: 3000,
         isLoading: false,
         hideProgressBar: false,
         draggable: true,
      });
      toastId = null;
   }
};

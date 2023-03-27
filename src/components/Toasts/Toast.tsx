import React, { useEffect } from 'react';
import cx from 'classnames';

import { removeToast, ToastStatusType } from 'redux/slices/toastSlice';
import { useAppDispatch } from 'hooks/useAppDispatch';

interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  message: string;
  status: ToastStatusType;
}

const Toast: React.FC<ToastProps> = ({ className, id, status, message }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(removeToast(id));
    }, 3000);
  }, []);

  const classes = {
    'bg-red-600': status === 'failed',
    'bg-slate-600': status === 'success',
  };

  return (
    <div
      className={cx(
        className,
        'toast-animate fixed top-20 left-1/2 z-50 p-4 px-6 rounded text-xs text-white font-medium shadow max-w-lg',
        classes
      )}
    >
      {message}
    </div>
  );
};

export default Toast;

import React from 'react';
import { useAppSelector } from 'hooks/useAppSelector';

import './toast.scss';

import Toast from './Toast';

interface ToastsProps extends React.HTMLAttributes<HTMLDivElement> {}

const Toasts: React.FC<ToastsProps> = ({ className }) => {
  const toasts = useAppSelector((state) => state.toast.toasts);
  return (
    <>
      {toasts.map(({ id, message, status }) => {
        return <Toast key={id} id={id} message={message} status={status} />;
      })}
    </>
  );
};

export default Toasts;

import React, { useEffect, useState } from 'react';
import cx from 'classnames';

import ClearIcon from 'assets/img/icons/clear.svg';

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  onClose: () => void;
  closeButtonPosition?: 'top-left' | 'top-right';
  transparent?: boolean;
  closeButtonClass?: string;
  closeButtonIconClass?: string;
  modalClass?: string;
}

const Modal: React.FC<ModalProps> = ({
  className,
  transparent,
  children,
  onClose,
  closeButtonPosition,
  closeButtonClass = '',
  closeButtonIconClass = '',
  modalClass = '',
}) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div
      className={cx(
        className,
        'fixed flex justify-center items-center top-0 left-1/2 -translate-x-1/2 w-screen lg:max-w-[1440px] h-screen z-50'
      )}
    >
      <div
        onClick={() => onClose()}
        className={cx(
          'fixed top-0 left-0 w-screen lg:max-w-[1440px] h-screen bg-black bg-opacity-60',
          {
            '!bg-transparent': transparent,
          }
        )}
      ></div>
      <div
        className={cx(
          'max-h-[calc(100vh-2rem)] max-w-[calc(100vw-2rem)] lg:max-w-[calc(1440px-2rem)] flex relative rounded',
          modalClass
        )}
      >
        {children}
        <button
          onClick={() => onClose()}
          className={cx(
            'z-10 absolute top-3 left-3 w-12 h-12 fill-white rounded-full bg-slate-800 bg-opacity-80 flex items-center justify-center',
            {
              'left-auto right-3': closeButtonPosition === 'top-right',
            },
            closeButtonClass
          )}
        >
          <ClearIcon
            className={cx('w-8 h-8 fill-inherit', closeButtonIconClass)}
          />
        </button>
      </div>
    </div>
  );
};

export default Modal;

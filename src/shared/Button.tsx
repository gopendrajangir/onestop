import React from 'react';
import cx from 'classnames';

import Loader from 'shared/Loader';

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: 'primary' | 'outline' | 'light';
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
  color?: 'primary' | 'secondary';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  loading,
  variant = 'primary',
  size = 'base',
  disabled = false,
  color = 'secondary',
  ...props
}) => {
  const classes = {
    border: variant === 'outline',
    'text-slate-600 fill-slate-600 border border-slate-300 hover:border-slate-500':
      variant === 'outline' && color === 'secondary',
    'border-violet-500 hover:border-violet-400 text-violet-500 hover:text-violet-400':
      color === 'primary',
    'bg-violet-500 hover:bg-opacity-90 disabled:bg-opacity-90 text-white':
      variant === 'primary',
    'bg-white hover:bg-slate-100 disabled:bg-slate-100 text-slate-700':
      variant === 'light',
    'text-[1.1rem] h-12 px-4': size === 'xs',
    'text-[1.3rem] h-14 px-4': size === 'sm',
    'text-[1.4rem] h-16 px-5': size === 'base',
    'text-[1.6rem] h-18 px-6': size === 'lg',
    'text-[1.8rem] h-20 px-6': size === 'xl',
  };

  return (
    <button
      disabled={loading || disabled}
      className={cx(
        'flex items-center justify-center px-5 shadow-sm transition-all gap-x-3 uppercase',
        classes,
        className
      )}
      {...props}
    >
      {loading ? <Loader /> : children}
    </button>
  );
};

export default Button;

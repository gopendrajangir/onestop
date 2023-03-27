import React from 'react';
import cx from 'classnames';

export interface TextButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  variant?: 'primary';
}

const TextButton: React.FC<TextButtonProps> = ({
  className,
  variant,
  children,
  ...props
}) => {
  return (
    <button
      className={cx(
        'uppercase text-[1.1rem] font-bold text-slate-600',
        {
          '!text-violet-500': variant === 'primary',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default TextButton;

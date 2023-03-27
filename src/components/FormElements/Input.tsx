import React, { HTMLInputTypeAttribute, LegacyRef } from 'react';
import cx from 'classnames';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
  type: HTMLInputTypeAttribute;
  pattern?: string;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  variant?: string;
  value?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, variant, ...props }, ref) => {
    return (
      <input
        ref={ref}
        {...props}
        className={cx(
          'h-16 pl-5 text-[1.4rem] outline-none border rounded text-slate-500 focus:text-slate-700 focus:border-slate-400',
          {
            'border !border-red-400': error,
            'border rounded bg-slate-50 focus:shadow-none':
              variant === 'outline',
          },
          className
        )}
      />
    );
  }
);

export default Input;

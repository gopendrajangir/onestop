import React, { useState } from 'react';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

import VisibilityOffIcon from 'assets/img/icons/visibility-off.svg';
import VisibilityOnIcon from 'assets/img/icons/visibility-on.svg';

interface PasswordInputProps extends React.HTMLAttributes<HTMLInputElement> {
  pattern?: string;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, error, ...props }, ref) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    return (
      <div
        className={`flex gap-x-2 items-center bg-white w-[24rem] border-b ${
          isFocused ? 'shadow-md' : ''
        } ${error ? 'border !border-red-400' : ''} ${className}`}
      >
        <input
          type={isVisible ? 'text' : 'password'}
          ref={ref}
          {...props}
          className="min-w-0 flex-1 h-16 pl-5 text-[1.4rem] outline-none"
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
        />
        <button
          aria-label="Password visibility toggle button"
          type="button"
          className="px-4"
          onClick={() => {
            setIsVisible(!isVisible);
          }}
        >
          {isVisible ? (
            <VisibilityOffIcon
              aria-label="Visibility off icon"
              className="h-6 fill-slate-700"
            />
          ) : (
            <VisibilityOnIcon
              aria-label="Visibility on icon"
              className="h-6 fill-slate-700"
            />
          )}
        </button>
      </div>
    );
  }
);

export default PasswordInput;

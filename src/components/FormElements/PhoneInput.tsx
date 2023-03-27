import React, { useState } from 'react';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

import Input from 'components/FormElements/Input';

import IndiaFlag from 'assets/img/icons/india.svg';

interface PhoneInputProps extends React.HTMLAttributes<HTMLInputElement> {
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
}

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ error, className, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    return (
      <div
        className={`flex items-center w-[24rem] h-16 bg-white border border-slate-400 rounded bg-transparent ${
          error && 'border border-red-400'
        }`}
      >
        <div className="flex h-full">
          <div
            className={`border-r border-r-slate-400 px-2 pl-3 ${
              error && '!border-r-red-400'
            } ${
              isFocused && ''
            } flex justify-center gap-x-2 items-center h-full text-[1.1rem] text-slate-600`}
          >
            <IndiaFlag aria-label="India flag icon" className="h-5" />
            (+91)
          </div>
        </div>
        <Input
          type="text"
          ref={ref}
          {...props}
          className="border-none min-w-0 flex-1 pl-3 !h-full focus:shadow-none bg-transparent"
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
        />
      </div>
    );
  }
);

export default PhoneInput;

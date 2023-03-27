import React from 'react';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

interface InputErrorProps extends React.HTMLAttributes<HTMLParagraphElement> {
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
}

const InputError: React.FC<InputErrorProps> = ({ error }) => {
  return (
    error && <p className="text-red-400 text-xs">{error?.message as string}</p>
  );
};

export default InputError;

import React from 'react';
import cx from 'classnames';

import CheckIcon from 'assets/img/icons/checkmark.svg';

interface CheckLabelProps extends React.HTMLAttributes<HTMLLabelElement> {
  checked: boolean;
  htmlFor: string;
}

const CheckLabel: React.FC<CheckLabelProps> = ({
  className,
  children,
  checked,
  htmlFor,
}) => {
  return (
    <label
      className={cx(
        'flex-1 h-16 flex justify-center items-center cursor-pointer',
        {
          'border-slate-400': checked,
        },
        className
      )}
      htmlFor={htmlFor}
    >
      <div className="relative flex items-center">
        {checked && (
          <CheckIcon className="absolute w-5 fill-green-500 right-[105%] mb-1" />
        )}
        <span>{children}</span>
      </div>
    </label>
  );
};

export default CheckLabel;

import React from 'react';
import cx from 'classnames';

interface LabelProps extends React.HTMLAttributes<HTMLLabelElement> {
  htmlFor?: string;
}

const Label: React.FC<LabelProps> = ({ htmlFor, children, className }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={cx('text-xs font-normal text-slate-500', className)}
    >
      {children}
    </label>
  );
};

export default Label;

import React from 'react';
import cx from 'classnames';

interface FormGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  row?: boolean;
}

const FormGroup: React.FC<FormGroupProps> = ({ children, className, row }) => {
  return (
    <div
      className={cx(
        'flex flex-col gap-2',
        {
          '!flex-row items-center gap-x-4': row,
        },
        className
      )}
    >
      {children}
    </div>
  );
};

export default FormGroup;

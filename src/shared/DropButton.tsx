import React from 'react';
import cx from 'classnames';

import ChevronDownIcon from 'assets/img/icons/chevron-down.svg';

interface DropButtonProps extends React.HTMLAttributes<HTMLButtonElement> {}

const DropButton: React.FC<DropButtonProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={cx(
        'flex items-center gap-x-1 px-4 py-2 text-xs rounded-full text-center text-slate-600 hover:bg-slate-200 bg-slate-100'
      )}
      {...props}
    >
      {children}
      <ChevronDownIcon className="h-6 w-6 fill-slate-400" />
    </button>
  );
};

export default DropButton;

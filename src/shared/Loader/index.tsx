import React from 'react';
import cx from 'classnames';

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'primary';
}

const Loader: React.FC<LoaderProps> = ({ className, variant }) => {
  return (
    <div
      className={cx(
        className,
        `w-[2rem] aspect-square rounded-full border-[3px] animate-spin border-slate-300 border-t-slate-500`,
        {
          'border-t-violet-500 !border-[4px]': variant === 'primary',
        }
      )}
    ></div>
  );
};

export default Loader;

import React from 'react';
import cx from 'classnames';

interface AnimatedErrorProps extends React.HTMLAttributes<HTMLDivElement> {
  message: string;
}

const AnimatedError: React.FC<AnimatedErrorProps> = ({
  className,
  message,
}) => {
  return (
    <div className={cx(className, 'w-full')}>
      <span className="flex text-red-400 text-sm">{message}</span>
    </div>
  );
};

export default AnimatedError;

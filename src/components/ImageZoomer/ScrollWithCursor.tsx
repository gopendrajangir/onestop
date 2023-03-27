import React, { useEffect, useState, useRef } from 'react';
import cx from 'classnames';

interface ScrollWithCursorProps extends React.HTMLAttributes<HTMLDivElement> {}

const ScrollWithCursor: React.FC<ScrollWithCursorProps> = ({
  className,
  children,
}) => {
  const divRef = useRef<HTMLDivElement>();

  useEffect(() => {
    if (divRef.current) {
      divRef.current.addEventListener('mousemove', (e: MouseEvent) => {
        const cursorPositionPercentage =
          (e.clientY * 100) / divRef.current.offsetHeight;
        divRef.current.scrollTop =
          ((divRef.current.scrollHeight - divRef.current.offsetHeight) *
            cursorPositionPercentage) /
          100;
      });
    }
  }, []);

  return (
    <div ref={divRef} className={cx(className, '')}>
      {children}
    </div>
  );
};

export default ScrollWithCursor;

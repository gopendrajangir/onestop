import React, { RefObject, useEffect, useRef } from 'react';
import useClickAwayListener from 'hooks/useClickAwayListener';

interface ClickAwayListenerProps extends React.HTMLAttributes<HTMLElement> {
  shouldShow?: boolean;
  avoidableRef?: RefObject<HTMLElement>;
  onClickAway?: () => void;
}

const ClickAwayListener: React.FC<ClickAwayListenerProps> = ({
  children,
  onClickAway,
  avoidableRef,
}) => {
  const childrenRef = useRef();

  const [show, setShow] = useClickAwayListener(
    childrenRef,
    onClickAway,
    avoidableRef
  );

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <>
      {!!show &&
        React.Children.only(
          React.cloneElement(children as React.ReactElement, {
            ref: childrenRef,
          })
        )}
    </>
  );
};

export default ClickAwayListener;

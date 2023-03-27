import { useState, useEffect, useCallback } from 'react';

function useClickAwayListener(
  menuRef: React.RefObject<HTMLElement>,
  cb: () => void,
  avoidableRef?: React.RefObject<HTMLElement>
) {
  let [show, setShow] = useState(false);

  const bodyClickListener = useCallback(
    (e: MouseEvent) => {
      let target = e.target as Element;

      while (target != null) {
        if (
          target === menuRef.current ||
          (avoidableRef.current && avoidableRef.current === target)
        ) {
          return;
        }
        target = target.parentElement;
      }
      cb();
      setShow(false);
    },
    [show, setShow]
  );

  useEffect(() => {
    document.addEventListener('click', bodyClickListener);
    return () => {
      document.removeEventListener('click', bodyClickListener);
    };
  }, [bodyClickListener]);

  return [show, setShow] as const;
}

export default useClickAwayListener;

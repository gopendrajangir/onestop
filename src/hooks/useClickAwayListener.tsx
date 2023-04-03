import { useState, useEffect, useCallback } from 'react';

function useClickAwayListener(
  menuRef: React.RefObject<HTMLElement>,
  cb: () => void,
  avoidableRef?: React.RefObject<HTMLElement>
) {
  let [show, setShow] = useState(false);

  const bodyClickListener = useCallback(
    (e: MouseEvent) => {
      if (!show) return;

      let target = e.target as Element;

      while (target != null) {
        if (
          target === menuRef.current ||
          (avoidableRef &&
            avoidableRef.current &&
            avoidableRef.current === target)
        ) {
          return;
        }
        target = target.parentElement;
      }
      if (cb) cb();
      setShow(false);
    },
    [show]
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

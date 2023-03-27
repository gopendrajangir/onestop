import { useState, useEffect, useCallback } from 'react';

function useMenu(
  menuRef: React.RefObject<HTMLElement>,
  btnRef: React.RefObject<HTMLButtonElement>
) {
  let [show, setShow] = useState(false);

  const bodyClickListener = useCallback(
    (e: MouseEvent) => {
      let target = e.target as Element;

      while (target != null) {
        if (target === menuRef.current || target === btnRef.current) {
          return;
        }
        target = target.parentElement;
      }

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

export default useMenu;

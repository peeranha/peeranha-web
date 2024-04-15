import { useEffect, useCallback } from 'react';

export default function useKeyDown(callback: () => void, keys: number[]) {
  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const isKeyPressed = keys.some(
        (key) => (event.ctrlKey || event.metaKey) && event.keyCode === key,
      );
      if (isKeyPressed) {
        event.preventDefault();
        callback();
      }
    },
    [callback, keys],
  );

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [onKeyDown]);
}

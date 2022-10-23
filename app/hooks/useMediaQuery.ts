import { useState, useEffect } from 'react';

const isClient = typeof window !== 'undefined';

const useMediaQuery = (mediaQuery: string): boolean => {
  const [isVerified, setIsVerified] = useState<boolean>(
    isClient ? !!window.matchMedia(mediaQuery).matches : false,
  );

  useEffect(
    () => {
      const mediaQueryList = window.matchMedia(mediaQuery);
      setIsVerified(!!mediaQueryList.matches);
      const documentChangeHandler = (e): void => setIsVerified(!!e.matches);

      if (typeof mediaQueryList.addEventListener === 'function') {
        mediaQueryList.addEventListener('change', documentChangeHandler);
        return function cleanup(): void {
          mediaQueryList.removeEventListener('change', documentChangeHandler);
        };
      }
      mediaQueryList.addListener(documentChangeHandler);
      return function cleanup(): void {
        mediaQueryList.addListener(documentChangeHandler);
      };
    },
    [mediaQuery],
  );

  return isVerified;
};

export default useMediaQuery;

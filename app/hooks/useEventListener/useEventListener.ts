import { useEffect, RefObject, useCallback } from 'react';

export type UseEventListenerProps = {
  target?: RefObject<HTMLElement>;
  event?: string;
  handler: (event: Event) => void;
};

const useEventListener = (
  { target, event = 'click', handler }: UseEventListenerProps,
  deps: ReadonlyArray<any> = []
): void => {
  const callback = useCallback(handler, deps);
  const events: string[] = event.split(' ');

  useEffect(() => {
    const targetElement: HTMLElement | Document = target?.current || document;

    events.forEach((event): void => {
      targetElement.addEventListener(event, callback, { passive: true });
    });

    return (): void => {
      events.forEach((event): void => {
        targetElement.removeEventListener(event, callback);
      });
    }
  }, [callback]);
};

export default useEventListener;

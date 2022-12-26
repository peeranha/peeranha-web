import React, { useLayoutEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

type PortalProps = {
  appendTo?: HTMLElement;
  children: React.ReactElement;
  isFixedBody?: boolean;
  zIndex?: string;
};

const DEFAULT_Z_INDEX = 1000;
let portalAmount = DEFAULT_Z_INDEX;

const Portal: React.FC<PortalProps> = ({
  children,
  isFixedBody = true,
  appendTo = document.querySelector('#portal-root') as HTMLElement,
  zIndex,
}) => {
  const portalRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (isFixedBody) {
      document.querySelectorAll('.portal-padding, body').forEach((node) => {
        const element = node as HTMLElement;
        element.style.setProperty(
          'padding-right',
          `${window.innerWidth - document.body.clientWidth}px`,
        );
      });
      document.querySelectorAll('body').forEach((node) => {
        node.classList.add('scroll-disabled');
      });
    }
    portalAmount += 10;
    if (portalRef.current && portalRef.current.lastElementChild) {
      const lastElementChild = portalRef.current
        .lastElementChild as HTMLElement;
      lastElementChild.style.zIndex = zIndex ? zIndex : String(portalAmount);
    }
    return (): void => {
      portalAmount -= 10;
      if (isFixedBody && portalAmount === DEFAULT_Z_INDEX) {
        document.querySelectorAll('body').forEach((node) => {
          node.classList.remove('scroll-disabled');
        });
        document.querySelectorAll('.portal-padding, body').forEach((node) => {
          const element = node as HTMLElement;
          element.style.removeProperty('padding-right');
        });
      }
    };
  }, [appendTo, portalRef]);

  return <>{createPortal(<div ref={portalRef}>{children}</div>, appendTo)}</>;
};

export default Portal;

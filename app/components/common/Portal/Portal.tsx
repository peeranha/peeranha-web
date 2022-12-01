import React, { useLayoutEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

type PortalProps = {
  appendTo?: HTMLElement;
  children: React.ReactElement;
  isFixedBody?: boolean;
};

const DEFAULT_Z_INDEX = 6;
let portalAmount = DEFAULT_Z_INDEX;

const Portal: React.FC<PortalProps> = ({
  children,
  isFixedBody = true,
  appendTo = document.querySelector('#portal-root') as HTMLElement,
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
    portalAmount += 1;
    if (portalRef.current && portalRef.current.lastElementChild) {
      const lastElementChild = portalRef.current
        .lastElementChild as HTMLElement;
      lastElementChild.style.zIndex = String(portalAmount);
    }
    return (): void => {
      portalAmount -= 1;
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

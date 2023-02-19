import React, { useEffect, useRef } from 'react';
import cn from 'classnames';
import { css } from '@emotion/react';
import { styles } from './index.styled';

const ScrollContainer: React.FC<{
  children: any;
  className?: string;
  classNameChild?: string;
}> = ({ children, className, classNameChild }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (element) {
      let isMoving = false;
      let isMouseDown = false;
      let scrollLeft = 0;
      let x = 0;

      const handleMouseUp = (): void => {
        isMouseDown = false;
      };

      const handleMouseMove = (e): void => {
        if (isMouseDown && Math.abs(e.clientX - x) > 2) {
          isMoving = true;
          element.scrollLeft = scrollLeft - e.clientX + x;
        }
      };

      const handleMouseDown = (e): void => {
        isMouseDown = true;
        scrollLeft = element.scrollLeft;
        x = e.clientX;
        e.preventDefault();
      };

      const handleClick = (e): void => {
        if (isMoving) {
          isMoving = false;
          e.stopPropagation();
          e.preventDefault();
        }
      };

      element.addEventListener('click', handleClick);
      element.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('mousemove', handleMouseMove);
      return (): void => {
        element.removeEventListener('click', handleClick);
        element.removeEventListener('mousedown', handleMouseDown);
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }

    return undefined;
  }, []);

  return (
    <div className={cn('ovh', className)}>
      <div className={cn(classNameChild)} css={css(styles.container)} ref={ref}>
        {children}
      </div>
    </div>
  );
};

export default ScrollContainer;

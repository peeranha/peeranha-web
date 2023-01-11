import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import Portal from '../Portal';
import CloseIcon from 'icons/Close';
import classes from './Popup.styled';
import { PopupProps } from './types';

const Popup: React.FC<PopupProps> = ({
  size = 'full',
  title = '',
  onClose,
  children,
  header,
  className,
  isTransition = true,
}) => {
  const [style, setStyle] = useState({});
  const stopPropagation = (e: React.SyntheticEvent): void => {
    e.stopPropagation();
  };

  useEffect(() => {
    setStyle({
      opacity: 1,
      transform: 'translateY(0)',
    });
  }, []);

  return (
    <Portal>
      <div
        className={cn('pa df jcc aic l0 r0 t0 b0', className)}
        css={{
          ...classes.popup,
          ...classes[size],
        }}
        onClick={onClose}
      >
        <div
          style={style}
          className={cn('pr border-box full-width p16 scrollbar content-popup')}
          css={{
            ...classes.content,
            ...(isTransition && {
              transition: 'all 0.3s ease-out',
              opacity: 0.5,
              transform: 'translateY(-10%)',
            }),
          }}
          onClick={stopPropagation}
        >
          {header || (
            <div css={classes.header}>
              {title && <h1 className="line-clamp-1 tc">{title}</h1>}
              <div className={cn('pa cup df aic jcc')} css={classes.close}>
                <CloseIcon onClick={onClose} />
              </div>
            </div>
          )}

          <div className={cn('pr scrollbar')} css={classes.container}>
            {children}
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default Popup;

import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import Portal from 'citrus-ui/core/components/Portal';
import CloseIcon from 'citrus-ui/core/icons/Close';
import useStyles from './Popup.styles';
import { PopupProps } from './types';

const Popup: React.FC<PopupProps> = ({
  size = 'full',
  type = 'default',
  title = '',
  onClose,
  children,
  header,
  className,
  isTransition = true,
}) => {
  const classes = useStyles({ isTransition, type });
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
        className={cn(
          'pa df jcc aic l0 r0 t0 b0',
          classes.popup,
          { [classes[size]]: type !== 'advertising' },
          className,
        )}
        onClick={onClose}
      >
        <div
          style={style}
          className={cn(
            'pr border-box full-width p16 scrollbar',
            classes.content,
          )}
          onClick={stopPropagation}
        >
          {header ||
            (type === 'default' && (
              <div className={classes.header}>
                {title && <h1 className="line-clamp-1">{title}</h1>}
                <div className={cn('pa cup df aic jcc', classes.close)}>
                  <CloseIcon onClick={onClose} />
                </div>
              </div>
            ))}
          <div className={cn('pr scrollbar', classes.container)}>
            {children}
            {type === 'advertising' && (
              <div
                className={cn('pa cup df aic jcc', classes.closeAdvertising)}
              >
                <CloseIcon onClick={onClose} />
              </div>
            )}
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default Popup;

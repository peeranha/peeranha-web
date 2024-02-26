import React from 'react';
import { css } from '@emotion/react';
import { styles } from './Spinner.styled';

type SpinnerProps = {
  color?: string;
  size?: number;
};

const Spinner: React.FC<SpinnerProps> = ({ color = '#6F4CFF', size = 36 }): JSX.Element => (
  <>
    <div
      css={css({
        ...styles.loadingSpinner,
        borderTopColor: color,
        width: `${size}px`,
        height: `${size}px`,
      })}
    />
  </>
);

export default Spinner;

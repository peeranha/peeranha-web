import React from 'react';
import { css } from '@emotion/react';
import { singleCommunityColors, graphCommunityColors } from 'utils/communityManagement';
import { styles } from './Spinner.styled';

const colors = singleCommunityColors();
const graphCommunity = graphCommunityColors();

type SpinnerProps = {
  color?: string;
  size?: number;
};

const Spinner: React.FC<SpinnerProps> = ({
  color = 'rgb(247, 111, 96)',
  size = 36,
}): JSX.Element => (
  <>
    <div
      css={css({
        ...styles.loadingSpinner,
        borderTopColor: graphCommunity ? '#6F4CFF' : color,
        width: `${size}px`,
        height: `${size}px`,
      })}
    />
  </>
);

export default Spinner;

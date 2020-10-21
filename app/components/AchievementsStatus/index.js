import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { IconLg } from 'components/Icon/IconWithSizes';
import achievementsIcon from 'images/achievement_inline.svg?external';

import { PEER_PRIMARY_COLOR } from 'style-constants';

const StatusSpan = styled.span`
  display: flex;
  font-size: ${props => (props.size === 'lg' ? '16px' : '14px')};
  align-items: baseline;
  margin-right: 0.5rem;
`;

const Count = styled.span`
  margin-left: 0.15rem;
  color: ${props => (props.size === 'lg' ? 'inherit' : PEER_PRIMARY_COLOR)};
`;

const AchievementsStatus = ({ count, size }) => {
  if (count)
    return (
      <StatusSpan size={size}>
        <IconLg
          icon={achievementsIcon}
          width={size === 'lg' ? '16' : '10'}
          height={size === 'lg' ? '16' : '10'}
        />
        <Count size={size}>{count}</Count>
      </StatusSpan>
    );
  return null;
};

AchievementsStatus.propTypes = {
  count: PropTypes.number,
  size: PropTypes.string,
};

export default AchievementsStatus;

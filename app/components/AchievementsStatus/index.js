import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Icon from 'components/Icon';
import achievementsIcon from 'images/achievement_inline.svg?external';

import { PEER_PRIMARY_COLOR } from 'style-constants';

const StatusSpan = styled.span`
  position: relative;
  display: flex;
  font-size: ${props => (props.size === 'lg' ? '16px' : '14px')};
  align-items: baseline;
  margin-right: 0.5rem;
  padding-left: ${props => (props.size === 'lg' ? '22px' : '12px')};
`;

const Count = styled.span`
  margin-left: 0.25rem;
  color: ${props => (props.size === 'lg' ? 'inherit' : PEER_PRIMARY_COLOR)};
`;

const IconAbsolute = styled(Icon)`
  position: absolute;
  top: ${props => (props.size === 'lg' ? '2px' : '3.4px')};
  left: 0;

  .achievement-inline * {
    stroke-width: ${props => (props.size === 'lg' ? '0.7px' : '1px')};
  }
`;

const AchievementsStatus = ({ count, size }) => {
  if (count)
    return (
      <StatusSpan size={size}>
        <IconAbsolute
          icon={achievementsIcon}
          width={size === 'lg' ? '24' : '14'}
          height={size === 'lg' ? '24' : '14'}
          size={size}
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

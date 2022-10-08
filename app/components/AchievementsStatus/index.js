import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import AchivementsIcon from 'icons/Achivements';

import {
  PEER_PRIMARY_COLOR,
  PEER_PRIMARY_TRANSPARENT_COLOR,
} from 'style-constants';
import { customRatingIconColors } from '../../constants/customRating';

const StatusSpan = styled.span`
  position: relative;
  display: flex;
  font-size: ${props => (props.size === 'lg' ? '16px' : '14px')};
  align-items: center;
  margin-right: 0.5rem;

  & svg {
    position: relative;
    top: 3px;
  }

  @media (max-width: 350px) {
    flex-direction: ${({ isProfilePage }) => !isProfilePage && 'column'};
    align-items: center;
  }
`;

const Count = styled.span`
  margin-left: 0.25rem;
  color: ${props =>
    props.size === 'lg'
      ? 'inherit'
      : props.isSingleNumColor || PEER_PRIMARY_COLOR};

  @media (max-width: 350px) {
    padding-top: 5px;
    margin-left: 0;
  }
`;

const AchievementsStatus = ({ isProfilePage, count, size }) => {
  if (typeof count === 'number')
    return (
      <StatusSpan size={size} isProfilePage={isProfilePage}>
        <AchivementsIcon
          stroke={PEER_PRIMARY_COLOR}
          circleFill={PEER_PRIMARY_TRANSPARENT_COLOR}
          size={size === 'lg' ? [24, 24] : [14, 14]}
        />
        <Count
          size={size}
          isSingleNumColor={customRatingIconColors.strokeColor}
        >
          {count}
        </Count>
      </StatusSpan>
    );
  return null;
};

AchievementsStatus.propTypes = {
  count: PropTypes.number,
  size: PropTypes.string,
  achievIconStyles: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
};

export default AchievementsStatus;

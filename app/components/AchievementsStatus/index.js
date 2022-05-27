import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Icon from 'components/Icon';
import achievementsIcon from 'images/achievement_inline.svg?external';

import { PEER_PRIMARY_COLOR } from 'style-constants';
import { customRatingIconColors } from 'constants/customRating';

const StatusSpan = styled.span`
  position: relative;
  display: flex;
  font-size: ${props => (props.size === 'lg' ? '16px' : '14px')};
  align-items: baseline;
  padding-left: ${props => (props.size === 'lg' ? '22px' : '12px')};

  @media (max-width: 350px) {
    flex-direction: column;
    align-items: center;
    padding-left: 5px;
  }
`;

const Count = styled.span`
  margin-left: 0.25rem;
  color: ${props =>
    props.size === 'lg'
      ? 'inherit'
      : props.achievementsNumColor || PEER_PRIMARY_COLOR};

  @media (max-width: 350px) {
    padding-top: 5px;
    margin-left: 0;
  }
`;

const IconAbsolute = styled(Icon)`
  position: absolute;
  top: ${props => (props.size === 'lg' ? '2px' : '3.4px')};
  left: 0;

  @media (max-width: 350px) {
    position: static;
    transform: translateY(30%);
  }

  .achievement-inline * {
    stroke-width: ${props => (props.size === 'lg' ? '0.7px' : '1px')};
  }

  .stroke {
    stroke: ${customRatingIconColors.strokeColor};
  }
`;

const AchievementsStatus = ({
  count,
  size,
  achievementsNumColor,
  achievIconStyles,
}) => {
  if (typeof count === 'number')
    return (
      <StatusSpan size={size}>
        <IconAbsolute
          icon={achievementsIcon}
          width={size === 'lg' ? '24' : '14'}
          height={size === 'lg' ? '24' : '14'}
          size={size}
          specialStyles={achievIconStyles}
        />
        <Count size={size} achievementsNumColor={achievementsNumColor}>
          {count}
        </Count>
      </StatusSpan>
    );
  return null;
};

AchievementsStatus.propTypes = {
  count: PropTypes.number,
  size: PropTypes.string,
  achievementsNumColor: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  achievIconStyles: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
};

export default AchievementsStatus;

/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Icon from 'components/Icon';
import achievementsIcon from 'images/achievement_inline.svg?external';

import { PEER_PRIMARY_COLOR, TEXT_PRIMARY, APP_FONT } from 'style-constants';
import { customRatingIconColors } from 'constants/customRating';

import AchivementsIcon from 'icons/Achivements';
import { AwardGraph } from 'components/icons';
import { singleCommunityColors, graphCommunityColors } from 'utils/communityManagement';

const colors = singleCommunityColors();
const graphCommunity = graphCommunityColors();

const StatusSpan = styled.span`
  position: relative;
  display: flex;
  font-size: ${(props) => (props.size === 'lg' ? '16px' : '14px')};
  align-items: baseline;
  margin-right: ${graphCommunity ? '0' : '0.5rem'};
  padding-left: ${(props) => (props.size === 'lg' || graphCommunity ? '' : '12px')};

  @media (max-width: 350px) {
    flex-direction: ${({ isProfilePage }) => !isProfilePage && 'column'};
    margin-left: ${({ isProfilePage }) => isProfilePage && '-26px'};
    align-items: center;
  }
`;

const Count = styled.span`
  font-family: ${APP_FONT || 'Source Sans Pro, sans - serif'};
  margin-left: ${(props) => (props.size === 'lg' || graphCommunity ? '' : '0.25rem')};
  color: ${(props) =>
    props.size === 'lg'
      ? 'inherit'
      : graphCommunity
      ? '#6F4CFF'
      : props.isSingleNumColor || PEER_PRIMARY_COLOR};

  @media (max-width: 350px) {
    padding-top: 5px;
    margin-left: 0;
  }
`;

const IconAbsolute = styled(Icon)`
  position: absolute;
  top: ${(props) => (props.size === 'lg' ? '2px' : '3.4px')};
  left: 0;

  @media (max-width: 350px) {
    position: static;
    transform: translateY(30%);
  }

  .achievement-inline * {
    stroke-width: ${(props) => (props.size === 'lg' ? '0.7px' : '1px')};
  }

  .stroke {
    stroke: ${customRatingIconColors.strokeColor};
  }
`;

const AchievementsStatus = ({ isProfilePage, count, size, achievIconStyles }) => {
  if (typeof count === 'number')
    return (
      <StatusSpan
        size={size}
        isProfilePage={isProfilePage}
        css={{ display: 'flex', alignItems: 'center' }}
      >
        {graphCommunity ? (
          <AwardGraph size={[18, 18]} className="mr-1" stroke="#6F4CFF" fill="none" />
        ) : isProfilePage ? (
          <AchivementsIcon size={[18, 18]} stroke={colors.linkColor || TEXT_PRIMARY} />
        ) : (
          <IconAbsolute
            icon={achievementsIcon}
            width={size === 'lg' ? '24' : '14'}
            height={size === 'lg' ? '24' : '14'}
            size={size}
            specialStyles={achievIconStyles}
          />
        )}
        <Count
          size={size}
          isSingleNumColor={customRatingIconColors.strokeColor}
          isProfilePage={isProfilePage}
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

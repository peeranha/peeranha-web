import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { injectIntl, intlShape } from 'react-intl';

import {
  TEXT_DARK,
  TEXT_SECONDARY,
  PEER_PRIMARY_COLOR,
  PEER_PRIMARY_TRANSPARENT_COLOR,
  PEER_WARNING_COLOR,
  PEER_WARNING_TRANSPARENT_COLOR,
  PEER_ERROR_COLOR,
  PEER_PREMIUM_COLOR,
  PEER_PREMIUM_TRANSPARENT_COLOR,
} from 'style-constants';

import { getFormattedNum } from 'utils/numbers';
import { singleCommunityStyles } from 'utils/communityManagement';

import Span from 'components/Span';

import Icon from 'components/Icon';

import options from './options';

const styles = singleCommunityStyles();

const RatingStatusStyled = styled.span`
  display: flex;
  align-items: center;
  margin-right: 0.5rem;
`;

const RaitingInfo = styled.span`
  display: flex;
  align-items: center;
  width: max-content;
  margin-left: 5px;

  @media (max-width: 350px) {
    flex-direction: ${({ isProfilePage }) => !isProfilePage && 'column'};

    > *:first-child {
      margin-left: 4px;
    }
  }
`;

const getStatus = rating =>
  Object.keys(options).filter(
    x => options[x].minRating <= rating && options[x].maxRating >= rating,
  )[0];

const IconWithStatus = ({
  isProfilePage,
  className,
  size,
  rating,
  ratingNumColor,
  customRatingIconColors = {},
}) => {
  // ratingNumColor and customRatingIconColors are used for kanda community styling

  const {
    strokeColor,
    bannedFill,
    strangerFill,
    residentFill,
    superheroFill,
  } = customRatingIconColors;
  const full = options[getStatus(rating)];

  let color = TEXT_DARK;
  let fill = '';

  const bannedUser = rating <= options.banned.maxRating;

  if (bannedUser) {
    // banned
    color = strokeColor || PEER_ERROR_COLOR;
    fill = bannedFill || PEER_ERROR_COLOR;
  } else if (rating <= options.jrResident.maxRating) {
    // stranger - junior
    color = strokeColor || PEER_PRIMARY_COLOR;
    fill = strangerFill || PEER_PRIMARY_TRANSPARENT_COLOR;
  } else if (rating <= options.heroResident.maxRating) {
    // resident - hero
    color = strokeColor || PEER_WARNING_COLOR;
    fill = residentFill || PEER_WARNING_TRANSPARENT_COLOR;
  } else {
    // superhero
    color = strokeColor || PEER_PREMIUM_COLOR;
    fill = superheroFill || PEER_PREMIUM_TRANSPARENT_COLOR;
  }

  return (
    <RaitingInfo isProfilePage={isProfilePage} className={`${className}`}>
      <Icon
        className="d-inline-flex mr-1"
        icon={full?.icon[size || 'sm']}
        width={full?.icon.size[size || 'sm'].width}
        height={full?.icon.size[size || 'sm'].height}
        color={color}
        fill={fill}
        isColorImportant
        specialStyles={bannedUser && styles.bannedIconStyles}
      />

      <Span
        fontSize={size === 'lg' ? 18 : 14}
        lineHeight={size === 'lg' ? 18 : 14}
        bold={size === 'lg'}
        color={ratingNumColor || color}
      >
        {getFormattedNum(rating)}
      </Span>
    </RaitingInfo>
  );
};

/* eslint no-nested-ternary: 0 */
const RatingStatus = ({
  isProfilePage,
  rating = 0,
  size,
  intl,
  isRankOff,
  ratingNumColor,
  customRatingIconColors,
}) => {
  const full = options[getStatus(rating)];

  return (
    <RatingStatusStyled isProfilePage={isProfilePage}>
      <IconWithStatus
        isProfilePage={isProfilePage}
        size={size}
        rating={rating}
        ratingNumColor={ratingNumColor || ''}
        customRatingIconColors={customRatingIconColors}
      />
      <Span
        className={isRankOff ? 'd-none' : 'd-none d-lg-inline-block ml-1'}
        fontSize={size === 'lg' ? 16 : 14}
        color={size === 'lg' ? TEXT_DARK : TEXT_SECONDARY}
      >
        {intl.formatMessage({ id: full.messageId })}
      </Span>
    </RatingStatusStyled>
  );
};

RatingStatus.propTypes = {
  intl: intlShape.isRequired,
  rating: PropTypes.number,
  size: PropTypes.string,
  isRankOff: PropTypes.bool,
  ratingNumColor: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  customRatingIconColors: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
};

IconWithStatus.propTypes = {
  className: PropTypes.string,
  rating: PropTypes.number.isRequired,
  size: PropTypes.string,
  ratingNumColor: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  customRatingIconColors: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
};

export { IconWithStatus, getStatus };
export default React.memo(injectIntl(RatingStatus));

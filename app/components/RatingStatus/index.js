import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import {
  TEXT_PRIMARY,
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
import {
  singleCommunityStyles,
  singleCommunityColors,
} from 'utils/communityManagement';

import Span from 'components/Span';

import Icon from 'components/Icon';

import options from './options';

import StrangerBigIcon from 'icons/StrangerBig';

const styles = singleCommunityStyles();
const colors = singleCommunityColors();

const RatingStatusStyled = styled.span`
  display: flex;
  align-items: center;
  margin-right: 0.5rem;
`;

const RaitingInfo = styled.span`
  display: flex;
  align-items: center;
  width: max-content;

  @media (max-width: 350px) {
    flex-direction: ${({ isProfilePage }) => !isProfilePage && 'column'};

    > *:first-child {
      margin-left: ${({ isProfilePage }) => !isProfilePage && '4px'};
    }
  }
`;

const getStatus = (rating) =>
  Object.keys(options).filter(
    (x) => options[x].minRating <= rating && options[x].maxRating >= rating,
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

  const { strokeColor, bannedFill, strangerFill, residentFill, superheroFill } =
    customRatingIconColors;
  const full = options[getStatus(rating)];

  let color = TEXT_DARK;
  let fill = '';

  const bannedUser = rating <= options.banned.maxRating;

  if (bannedUser) {
    // banned
    color = PEER_ERROR_COLOR;
    fill = PEER_ERROR_COLOR;
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
      {isProfilePage ? (
        <StrangerBigIcon
          className="mr-2"
          size={[18, 18]}
          stroke={colors.linkColor || TEXT_PRIMARY}
        />
      ) : (
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
      )}

      <Span
        fontSize={size === 'lg' ? 18 : 14}
        lineHeight={size === 'lg' ? 18 : 14}
        bold={size === 'lg'}
        color={size === 'lg' ? 'var(--color-black)' : color}
      >
        {getFormattedNum(rating)}
      </Span>
    </RaitingInfo>
  );
};

const RatingStatus = ({
  isProfilePage,
  rating = 0,
  size,
  isRankOff,
  ratingNumColor,
  customRatingIconColors,
}) => {
  const { t } = useTranslation();
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
        className={isRankOff ? 'd-none' : 'd-none d-inline-block ml-2'}
        fontSize={size === 'lg' ? 17 : 14}
        color={size === 'lg' ? TEXT_DARK : TEXT_SECONDARY}
      >
        {t(full.messageId)}
      </Span>
    </RatingStatusStyled>
  );
};

RatingStatus.propTypes = {
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
export default React.memo(RatingStatus);

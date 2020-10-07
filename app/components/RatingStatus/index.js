import React from 'react';
import PropTypes from 'prop-types';
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

import Span from 'components/Span';

import Icon from 'components/Icon';

import options from './options';

import RatingStatusStyled from './RatingStatusStyled';

const getStatus = rating =>
  Object.keys(options).filter(
    x => options[x].minRating <= rating && options[x].maxRating >= rating,
  )[0];

const IconWithStatus = ({ className, size, rating }) => {
  const full = options[getStatus(rating)];

  let color = TEXT_DARK;
  let fill = '';

  if (rating <= options.banned.maxRating) {
    // banned
    color = PEER_ERROR_COLOR;
    fill = PEER_ERROR_COLOR;
  } else if (rating <= options.jrResident.maxRating) {
    // stranger - junior
    color = PEER_PRIMARY_COLOR;
    fill = PEER_PRIMARY_TRANSPARENT_COLOR;
  } else if (rating <= options.heroResident.maxRating) {
    // resident - hero
    color = PEER_WARNING_COLOR;
    fill = PEER_WARNING_TRANSPARENT_COLOR;
  } else {
    // superhero
    color = PEER_PREMIUM_COLOR;
    fill = PEER_PREMIUM_TRANSPARENT_COLOR;
  }

  return (
    <span className={`d-flex align-items-center ${className}`}>
      <Icon
        className="d-inline-flex mr-1"
        icon={full.icon[size || 'sm']}
        width={full.icon.size[size || 'sm'].width}
        height={full.icon.size[size || 'sm'].height}
        color={color}
        fill={fill}
        isColorImportant
      />

      <Span
        fontSize={size === 'lg' ? 18 : 14}
        lineHeight={size === 'lg' ? 18 : 14}
        bold={size === 'lg'}
        color={color}
      >
        {getFormattedNum(rating)}
      </Span>
    </span>
  );
};

/* eslint no-nested-ternary: 0 */
const RatingStatus = ({ rating = 0, size, intl, isRankOff }) => {
  const full = options[getStatus(rating)];

  return (
    <RatingStatusStyled>
      <IconWithStatus size={size} rating={rating} />
      <Span
        className={isRankOff ? 'd-none' : 'd-none d-lg-inline-block'}
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
  rating: PropTypes.number.isRequired,
  size: PropTypes.string,
  isRankOff: PropTypes.bool,
};

IconWithStatus.propTypes = {
  className: PropTypes.string,
  rating: PropTypes.number.isRequired,
  size: PropTypes.string,
};

export { IconWithStatus, getStatus };
export default React.memo(injectIntl(RatingStatus));

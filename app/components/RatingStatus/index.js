import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';

import {
  TEXT_WARNING_LIGHT,
  TEXT_WARNING,
  TEXT_PRIMARY,
  TEXT_DARK,
  TEXT_SECONDARY,
} from 'style-constants';

import { getFormattedNum } from 'utils/numbers';

import Span from 'components/Span';

import options from './options';
import RatingStatusStyled from './RatingStatusStyled';

const getStatus = rating =>
  Object.keys(options).filter(
    x => options[x].minRating < rating && options[x].maxRating >= rating,
  )[0];

const IconWithStatus = ({ className, size, rating }) => {
  const full = options[getStatus(rating)];

  let color = TEXT_DARK;

  if (rating > options.newbie.minRating && size === 'sm') {
    color = TEXT_WARNING_LIGHT;
  } else if (rating <= options.banned.maxRating) {
    color = TEXT_WARNING;
  } else if (rating <= options.newbie.minRating && size === 'sm') {
    color = TEXT_PRIMARY;
  }

  return (
    <span className={`d-flex align-items-center ${className}`}>
      <img
        className="d-inline-flex mr-1"
        src={full.icon[size || 'sm']}
        alt="icon"
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

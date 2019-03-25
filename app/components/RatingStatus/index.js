import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';

import { getFormattedNum } from 'utils/numbers';

import Icon from 'components/Icon';
import Span from 'components/Span';

import options from './options';
import RatingStatusStyled from './RatingStatusStyled';

const getStatus = /* istanbul ignore next */ rating =>
  Object.keys(options).filter(
    x => options[x].minRating < rating && options[x].maxRating >= rating,
  )[0];

/* eslint no-nested-ternary: 0 */
const RatingStatus = /* istanbul ignore next */ ({
  rating,
  size,
  intl,
  isRankOff,
}) => {
  const full = options[getStatus(rating)];

  return (
    <RatingStatusStyled>
      <Icon className="d-inline-flex" icon={full.icon[size || 'sm']} />
      <Span
        fontSize={size === 'lg' ? 20 : 14}
        bold={size === 'lg'}
        color={
          rating > options.newbie.minRating && size === 'sm'
            ? 'pink'
            : rating < options.newbie.minRating && size === 'sm'
              ? 'blue'
              : 'black'
        }
      >
        {getFormattedNum(rating)}
      </Span>
      <Span
        className={isRankOff ? 'd-none' : ''}
        fontSize={size === 'lg' ? 16 : 14}
        color={size === 'lg' ? 'black' : 'gray'}
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

export default React.memo(injectIntl(RatingStatus));

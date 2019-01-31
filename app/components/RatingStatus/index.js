import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';

import { getFormattedNum } from 'utils/numbers';

import Icon from 'components/Icon';
import Span from 'components/Span';

import options from './options';
import RatingStatusStyled from './RatingStatusStyled';

const getStatus = rating =>
  Object.keys(options).filter(
    x => options[x].minRating < rating && options[x].maxRating >= rating,
  )[0];

const RatingStatus = ({ rating, size, intl }) => {
  const full = options[getStatus(rating)];

  return (
    <RatingStatusStyled>
      <Icon icon={full.icon[size || 'sm']} />
      <Span
        fontSize={size === 'lg' ? 20 : 14}
        color={size === 'lg' ? 'black' : 'blue'}
        bold={size === 'lg'}
      >
        {getFormattedNum(rating)}
      </Span>
      <Span
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
};

export default React.memo(injectIntl(RatingStatus));

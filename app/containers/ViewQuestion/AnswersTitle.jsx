import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { TEXT_SECONDARY } from 'style-constants';

import H4 from 'components/H4';
import Span from 'components/Span';

import messages from './messages';

export const AnswersTitle = ({ answersNum }) => (
  <H4 className="text-capitalize" isHeader>
    <FormattedMessage {...messages.answers} />{' '}
    <Span color={TEXT_SECONDARY} fontSize="30" bold>
      {answersNum}
    </Span>
  </H4>
);

AnswersTitle.propTypes = {
  answersNum: PropTypes.number,
};

export default React.memo(AnswersTitle);

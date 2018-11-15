import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

const AnswersTitle = props => (
  <h5 className="answers-title">
    {props.answersNum} <FormattedMessage {...messages.answers} />
  </h5>
);

AnswersTitle.propTypes = {
  answersNum: PropTypes.number,
};

export default AnswersTitle;

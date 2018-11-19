import React from 'react';
import PropTypes from 'prop-types';

import messages from './messages';

const AnswersTitle = props => (
  <h5 className="answers-title">
    {`${props.answersNum} ${props.translations[messages.answers.id]}`}
  </h5>
);

AnswersTitle.propTypes = {
  answersNum: PropTypes.number,
  translations: PropTypes.object,
};

export default AnswersTitle;

import React from 'react';
import PropTypes from 'prop-types';
import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import messages from './messages';

const askQuestion = () => createdHistory.push(routes.question_ask());

const QuestionsHeader = props => (
  <div className="questions-header">
    <h4 className="text-uppercase font-weight-bold">
      {props.translations[messages.title.id]}
    </h4>
    <button className="btn btn-secondary" onClick={askQuestion}>
      {props.translations[messages.askQuestion.id]}
    </button>
  </div>
);

QuestionsHeader.propTypes = {
  translations: PropTypes.object.isRequired,
};

export { askQuestion };
export default QuestionsHeader;

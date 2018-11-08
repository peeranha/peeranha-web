import React from 'react';
import PropTypes from 'prop-types';
import createdHistory from 'createdHistory';
import { FormattedMessage } from 'react-intl';

import AuthenticatedButton from 'containers/AuthenticatedButton';
import messages from './messages';

const askQuestion = () => createdHistory.push('questions/ask');

const QuestionsHeader = props => (
  <div className="questions-header">
    <h4 className="text-uppercase font-weight-bold">
      <FormattedMessage {...messages.title} />
    </h4>
    <AuthenticatedButton
      buttonClass="btn btn-secondary"
      buttonContent={props.translations[messages.askQuestion.id]}
      buttonAction={askQuestion}
    />
  </div>
);

QuestionsHeader.propTypes = {
  translations: PropTypes.object.isRequired,
};

export default QuestionsHeader;

import React from 'react';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

const NoQuestions = () => (
  <div className="text-center">
    <FormattedMessage {...messages.noQuestions} />
  </div>
);

export default NoQuestions;

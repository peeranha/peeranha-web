import React from 'react';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

const NoSuchQuestion = () => (
  <div className="text-center">
    <FormattedMessage {...messages.questionNotExist} />
  </div>
);

export default NoSuchQuestion;

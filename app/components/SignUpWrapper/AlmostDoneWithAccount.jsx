import React from 'react';
import { FormattedMessage } from 'react-intl';

import messages from 'containers/SignUp/messages';
import AlmostDone from './AlmostDone';

const AlmostDoneWrapper = () => (
  <AlmostDone
    message={
      <FormattedMessage id={messages.registrationWithEosAccountAlmostDone.id} />
    }
  />
);

export default AlmostDoneWrapper;

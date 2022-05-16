import React from 'react';
import { FormattedMessage } from 'react-intl';

import messages from 'containers/SignUp/messages';
import AlmostDone from './AlmostDone';

const AlmostDoneNoAccountWrapper = () => (
  <AlmostDone message={<FormattedMessage id={messages.weWillNotify.id} />} />
);

export default AlmostDoneNoAccountWrapper;

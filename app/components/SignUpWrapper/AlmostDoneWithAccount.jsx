import React from 'react';
import { FormattedMessage } from 'react-intl';

import messages from 'containers/SignUp/messages';
import AlmostDone from './AlmostDone';

export default React.memo(() => (
  <AlmostDone
    message={
      <FormattedMessage {...messages.registrationWithEosAccountAlmostDone} />
    }
  />
));

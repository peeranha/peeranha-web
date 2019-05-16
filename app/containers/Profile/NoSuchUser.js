import React from 'react';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

const NoSuchUser = /* istanbul ignore next */ () => (
  <div>
    <FormattedMessage {...messages.wrongUser} />
  </div>
);

export default NoSuchUser;

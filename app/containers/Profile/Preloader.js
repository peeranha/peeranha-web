import React from 'react';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

const Preloader = () => (
  <div className="text-center">
    <FormattedMessage {...messages.isProfileLoading} />
  </div>
);

export default Preloader;

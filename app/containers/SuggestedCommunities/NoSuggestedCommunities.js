import React from 'react';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

const NoSuggestedCommunities = () => (
  <div className="text-center">
    <FormattedMessage {...messages.noSuggestedCommunities} />
  </div>
);

export default NoSuggestedCommunities;

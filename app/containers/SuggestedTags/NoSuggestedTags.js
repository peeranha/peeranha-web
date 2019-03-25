import React from 'react';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

const NoSuggestedTags = () => (
  <div className="text-center">
    <FormattedMessage {...messages.noSuggestedTags} />
  </div>
);

export default NoSuggestedTags;

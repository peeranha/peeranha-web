import React from 'react';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

export const NoSuchQuestion = () => (
  <div className="text-center">
    <FormattedMessage {...messages.questionNotExist} />
  </div>
);

export default React.memo(NoSuchQuestion);

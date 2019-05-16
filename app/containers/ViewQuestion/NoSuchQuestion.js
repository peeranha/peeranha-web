import React from 'react';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

export const NoSuchQuestion = /* istanbul ignore next */ () => (
  <div className="text-center">
    <FormattedMessage {...messages.questionNotExist} />
  </div>
);

export default React.memo(NoSuchQuestion);

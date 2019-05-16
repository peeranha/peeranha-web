/**
 *
 * NoAccess
 *
 */

import React from 'react';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function NoAccess() {
  return (
    <div className="container">
      <div className="text-center pt-3">
        <FormattedMessage {...messages.errorMessage} />
      </div>
    </div>
  );
}

export default NoAccess;

/**
 *
 * NoAccess
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';

import Seo from 'components/Seo';
import messages from './messages';

function NoAccess() {
  return (
    <div className="container">
      <Seo
        title="No access"
        description="No access"
        language="en"
        index={false}
      />

      <div className="text-center pt-3">
        <FormattedMessage id={messages.errorMessage.id} />
      </div>
    </div>
  );
}

export default NoAccess;

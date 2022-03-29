import React from 'react';
import { FormattedMessage } from 'react-intl';

import * as routes from 'routes-config';
import messages from 'common-messages';

import { ADefault } from 'components/A';

export default React.memo(() => (
  <FormattedMessage
    {...messages.iAcceptPrivacyPolicy}
    values={{
      privacyPolicy: (
        <ADefault href={routes.privacyPolicy()} target="_blank">
          <FormattedMessage {...messages.privacyPolicy} />
        </ADefault>
      ),
      termsOfService: (
        <ADefault href={routes.termsAndConditions()} target="_blank">
          <FormattedMessage {...messages.termsOfService} />
        </ADefault>
      ),
      terms: (
        <ADefault
          href="https://resources.telosfoundation.io/governance_documents/TBNOA_Adopted_2018-11-20.pdf"
          target="_blank"
        >
          <FormattedMessage {...messages.terms} />
        </ADefault>
      ),
    }}
  />
));

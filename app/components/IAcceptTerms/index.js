import React from 'react';
import { FormattedMessage } from 'react-intl';

import * as routes from 'routes-config';
import messages from 'common-messages';

import { ADefault } from 'components/A';

export default React.memo(() => (
  <FormattedMessage
    id={messages.iAcceptPrivacyPolicy.id}
    values={{
      privacyPolicy: (
        <ADefault href={routes.privacyPolicy()} target="_blank">
          <FormattedMessage id={messages.privacyPolicy.id} />
        </ADefault>
      ),
      termsOfService: (
        <ADefault href={routes.termsAndConditions()} target="_blank">
          <FormattedMessage id={messages.termsOfService.id} />
        </ADefault>
      ),
      terms: (
        <ADefault
          href="https://resources.telosfoundation.io/governance_documents/TBNOA_Adopted_2018-11-20.pdf"
          target="_blank"
        >
          <FormattedMessage id={messages.terms.id} />
        </ADefault>
      ),
    }}
  />
));

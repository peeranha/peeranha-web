import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import { TEXT_SECONDARY } from 'style-constants';
import * as routes from 'routes-config';
import messages from 'common-messages';

import { getQuestionCode } from 'utils/privacyPolicyManagement';

import A from 'components/A';

import { CONTACTS_ID, FORM_ID } from 'containers/Support/constants';

const AdditionalLinks = styled.div`
  display: flex;
  flex-direction: column;

  a,
  footer {
    padding: 6px 15px;
    color: ${TEXT_SECONDARY};
  }

  footer {
    margin-top: 10px;
    font-size: 12px;
  }
`;

export default React.memo(() => (
  <AdditionalLinks>
    <A to={routes.home()}>
      <FormattedMessage {...messages.about} />
    </A>

    <A to={routes.support(CONTACTS_ID)}>
      <FormattedMessage {...messages.contacts} />
    </A>

    <A to={routes.support(FORM_ID)}>
      <FormattedMessage {...messages.support} />
    </A>

    <A to={routes.privacyPolicy(getQuestionCode())}>
      <FormattedMessage {...messages.privacyPolicy} />
    </A>

    <footer>
      @{new Date().getFullYear()} <FormattedMessage {...messages.peeranha} />
    </footer>
  </AdditionalLinks>
));

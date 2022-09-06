import * as routes from 'routes-config';
import messages from 'common-messages';
import { CONTACTS_ID, FORM_ID } from 'containers/Support/constants';

export const INFO_LINKS = [
  { route: routes.support(CONTACTS_ID), title: messages.contacts },
  { route: routes.support(FORM_ID), title: messages.support },
  { route: routes.privacyPolicy(), title: messages.privacyPolicy },
  { route: routes.termsAndConditions(), title: messages.termsOfService },
];

export const LINK_PRIVACY_POLICY = 'https://policies.google.com/privacy';

export const LINK_TERMS_OF_SERVICE = 'https://policies.google.com/terms';

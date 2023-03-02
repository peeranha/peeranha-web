import * as routes from 'routes-config';
import { CONTACTS_ID, FORM_ID } from 'containers/Support/constants';

export const INFO_LINKS = [
  { route: routes.support(CONTACTS_ID), title: 'common.contacts' },
  { route: routes.support(FORM_ID), title: 'common.support' },
  { route: routes.privacyPolicy(), title: 'common.privacyPolicy' },
  { route: routes.termsAndConditions(), title: 'common.termsOfService' },
];

export const LINK_PRIVACY_POLICY = 'https://policies.google.com/privacy';

export const LINK_TERMS_OF_SERVICE = 'https://policies.google.com/terms';

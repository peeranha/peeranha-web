import * as routes from 'routes-config';
import { CONTACTS_ID, FORM_ID } from 'containers/Support/constants';

export const LEFT_MENU_ID = 'containers_LefMenu_LEFT_MENU_ID';

export const INFO_LINKS = [
  { route: routes.home(), title: 'common.about' },
  { route: routes.support(CONTACTS_ID), title: 'common.contacts' },
  { route: routes.support(FORM_ID), title: 'common.support' },
  { route: routes.privacyPolicy(), title: 'common.privacyPolicy' },
  { route: routes.termsAndConditions(), title: 'common.termsOfService' },
];

export const FULL_SIZE = 770;
export const SEMI_SIZE = 630;

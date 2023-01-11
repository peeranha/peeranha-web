import * as routes from 'routes-config';
import { CONTACTS_ID, FORM_ID } from 'containers/Support/constants';

export const LEFT_MENU_ID = 'containers_LefMenu_LEFT_MENU_ID';

export const INFO_LINKS = [
  { route: routes.support(CONTACTS_ID), title: 'common.contacts' },
  { route: routes.support(FORM_ID), title: 'common.support' },
  { route: routes.privacyPolicy(), title: 'common.privacyPolicy' },
  { route: routes.termsAndConditions(), title: 'common.termsOfService' },
];

export const FULL_SIZE = 770;
export const SEMI_SIZE = 630;

export const MAX_NESTING_LEVEL = 3;
export const DOCUMENTATION_PADDING = 15;
export const PINNED_TITLE_LENGTH = 20;

import * as routes from 'routes-config';
import { isSingleCommunityWebsite } from 'utils/communityManagement';
import { CONTACTS_ID, FORM_ID } from 'containers/Support/constants';
import { DOCUMENTATION_ABOUT_LINK } from 'app/constants/documentation';
import ContactTwitter from 'icons/ContactTwitter';
import ContactGithub from 'icons/ContactGithub';
import ContactLinkedIn from 'icons/ContactLinkedIn';
import ContactMedium from 'icons/ContactMedium';
import ContactTelegram from 'icons/ContactTelegram';
import ContactEmail from 'icons/ContactEmail';
import ContactDiscord from 'icons/ContactDiscord';

const isSingleCommunityMode = isSingleCommunityWebsite();

export const INFO_LINKS = [
  {
    route: routes.support(CONTACTS_ID),
    title: `common.${isSingleCommunityMode ? 'peerContactsSupport' : 'contactsSupport'}`,
  },
  { route: routes.privacyPolicy(), title: 'common.privacyPolicy' },
  { route: routes.termsAndConditions(), title: 'common.termsOfService' },
  {
    route: DOCUMENTATION_ABOUT_LINK,
    title: `common.${isSingleCommunityMode ? 'peerDocumentation' : 'documentation'}`,
  },
];
export const CONTACTS_LINKS = [
  { icon: ContactTwitter, route: 'https://twitter.com/peeranhaio' },
  { icon: ContactGithub, route: 'https://github.com/peeranha' },
  { icon: ContactLinkedIn, route: 'https://www.linkedin.com/company/peeranha/about' },
  { icon: ContactMedium, route: 'https://medium.com/peeranha' },
  { icon: ContactTelegram, route: 'https://t.me/peeranhaio' },
  { icon: ContactEmail, route: 'mailto:hello@peeranha.io' },
  { icon: ContactDiscord, route: 'https://discord.gg/jmrbqVnzMZ' },
];

export const LINK_PRIVACY_POLICY = 'https://policies.google.com/privacy';

export const LINK_TERMS_OF_SERVICE = 'https://policies.google.com/terms';

export const PEERANHA = 'Peeranha';

export const TARGET_BLANK = '_blank';

/*
 * Header Messages
 *
 * This contains all the text for the Header component.
 */

import { defineMessages } from 'react-intl';

export default defineMessages({
  home: {
    id: 'app.components.Header.home',
    defaultMessage: 'Home',
    mark: 'tab',
    link: '/',
    tabCode: 1,
  },
  profile: {
    id: 'app.components.Header.profile',
    defaultMessage: 'Profile',
    mark: 'tab',
    link: '/profile',
    tabCode: 2,
  },
  about: {
    id: 'app.components.Header.about',
    defaultMessage: 'About',
    mark: 'tab',
    link: '/about',
    tabCode: 3,
  },
  help: {
    id: 'app.components.Header.help',
    defaultMessage: 'Help',
    mark: 'tab',
    link: '/help',
    tabCode: 4,
  },
  search: {
    id: 'app.components.Header.search',
    defaultMessage: 'Search',
  },
  signIn: {
    id: 'app.components.Header.signIn',
    defaultMessage: 'Sign In',
  },
});

/*
 * UserIsAbsentInSystem Messages
 */

import { defineMessages } from 'react-intl';

import {
  SCATTER_MODE_ERROR,
  SCATTER_BROWSER_EXTENSION_NOT_CONFIGURED,
  USER_IS_NOT_REGISTERED,
  USER_IS_NOT_SELECTED,
} from './constants';

const messages = defineMessages({
  authUserHasMore: {
    id: 'app.containers.Login.authUserHasMore',
  },
  staySignedIn: {
    id: 'app.containers.Login.staySignedIn',
  },
  iForgotPassword: {
    id: 'app.containers.Login.iForgotPassword',
  },
  weAreHappyYouAreHere: {
    id: 'app.containers.Login.weAreHappyYouAreHere',
  },
  yourUsernameIsHow: {
    id: 'app.containers.Login.yourUsernameIsHow',
  },
  referralMessage: {
    id: 'app.containers.Login.referralMessage',
  },
  optionalReferralCode: {
    id: 'app.containers.Login.optionalReferralCode',
  },
  [SCATTER_MODE_ERROR]: {
    id: 'app.containers.Login.scatterIsNotInstalled',
  },
  [SCATTER_BROWSER_EXTENSION_NOT_CONFIGURED]: {
    id: 'app.containers.Login.scatterBrowserExtensionNotConfigured',
  },
  [USER_IS_NOT_REGISTERED]: {
    id: 'app.containers.Login.userIsNotRegistered',
  },
  [USER_IS_NOT_SELECTED]: {
    id: 'app.containers.Login.userIsNotSelected',
  },
  accountNotCreatedName: {
    id: 'app.containers.Login.accountNotCreatedName',
  },
  inviterIsNotRegisterYet: {
    id: 'app.containers.Login.inviterIsNotRegisterYet',
  },
  iDontHaveAnAccount: {
    id: 'app.containers.Login.iDontHaveAnAccount',
  },
});

export const getAccountNotSelectedMessageDescriptor = isExtension =>
  isExtension
    ? messages[SCATTER_BROWSER_EXTENSION_NOT_CONFIGURED]
    : messages[USER_IS_NOT_SELECTED];

export default messages;

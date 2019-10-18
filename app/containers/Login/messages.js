/*
 * UserIsAbsentInSystem Messages
 */

import { defineMessages } from 'react-intl';

import {
  SCATTER_MODE_ERROR,
  USER_IS_NOT_REGISTERED,
  USER_IS_NOT_SELECTED,
} from './constants';

export default defineMessages({
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
  [SCATTER_MODE_ERROR]: {
    id: 'app.containers.Login.scatterIsNotInstalled',
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
});

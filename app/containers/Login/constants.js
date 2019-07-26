/*
 *
 * Login constants
 *
 */

// Fields
export const EMAIL_FIELD = 'email';
export const PASSWORD_FIELD = 'password';
export const REMEMBER_ME_FIELD = 'remember';
export const DISPLAY_NAME = 'display_name';

// Content
export const EMAIL_FORM = 'EMAIL_FORM';
export const EMAIL_PASSWORD_FORM = 'EMAIL_PASSWORD_FORM';
export const WE_ARE_HAPPY_FORM = 'WE_ARE_HAPPY_FORM';

// Action types
export const SHOW_LOGIN_MODAL = 'app/containers/Login/SHOW_LOGIN_MODAL';
export const HIDE_LOGIN_MODAL = 'app/containers/Login/HIDE_LOGIN_MODAL';
export const SHOW_EMAIL_PASSWORD_MODAL =
  'app/containers/Login/SHOW_EMAIL_PASSWORD_MODAL';

export const LOGIN_WITH_EMAIL = 'app/containers/Login/LOGIN_WITH_EMAIL';
export const LOGIN_WITH_EMAIL_SUCCESS =
  'app/containers/Login/LOGIN_WITH_EMAIL_SUCCESS';
export const LOGIN_WITH_EMAIL_ERROR =
  'app/containers/Login/LOGIN_WITH_EMAIL_ERROR';

export const LOGIN_WITH_SCATTER = 'app/containers/Login/LOGIN_WITH_SCATTER';
export const LOGIN_WITH_SCATTER_SUCCESS =
  'app/containers/Login/LOGIN_WITH_SCATTER_SUCCESS';
export const LOGIN_WITH_SCATTER_ERROR =
  'app/containers/Login/LOGIN_WITH_SCATTER_ERROR';

export const FINISH_REGISTRATION = 'app/containers/Login/FINISH_REGISTRATION';
export const FINISH_REGISTRATION_SUCCESS =
  'app/containers/Login/FINISH_REGISTRATION_SUCCESS';
export const FINISH_REGISTRATION_ERROR =
  'app/containers/Login/FINISH_REGISTRATION_ERROR';

// Errors
export const SCATTER_MODE_ERROR = 'SCATTER_MODE_ERROR';
export const USER_IS_NOT_SELECTED = 'USER_IS_NOT_SELECTED';
export const USER_IS_NOT_REGISTERED = 'USER_IS_NOT_REGISTERED';

// cookie
export const AUTH_TYPE = 'authorization_type';
export const AUTH_PRIVATE_KEY = 'auth_private_key';
export const AUTH_IS_VALID_DAYS = 7 * 24 * 60 * 60; // 7 days

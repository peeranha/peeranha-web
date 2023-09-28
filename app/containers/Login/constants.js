import { isSuiBlockchain } from 'utils/sui/sui';
export const EMAIL_FIELD = 'email';
export const VERIFICATION_CODE_FIELD = 'verificationCode';
export const EMAIL_LOGIN_DATA = 'emailLoginData';
export const EMAIL_FORM = 'EMAIL_FORM';
export const WE_ARE_HAPPY_FORM = 'WE_ARE_HAPPY_FORM';
export const SHOW_LOGIN_MODAL = 'app/containers/Login/SHOW_LOGIN_MODAL';
export const HIDE_LOGIN_MODAL = 'app/containers/Login/HIDE_LOGIN_MODAL';
export const LOGIN_WITH_WALLET = 'app/containers/Login/LOGIN_WITH_WALLET';
export const LOGIN_WITH_WALLET_SUCCESS = 'app/containers/Login/LOGIN_WITH_WALLET_SUCCESS';
export const LOGIN_WITH_WALLET_ERROR = 'app/containers/Login/LOGIN_WITH_WALLET_ERROR';

export const HIDE_SIGN_IN_MODAL = 'app/containers/Login/HIDE_SIGN_IN_MODAL';
export const SIGN_IN_WITH_EMAIL = 'app/containers/Login/SIGN_IN_WITH_EMAIL';
export const SIGN_IN_WITH_EMAIL_SUCCESS = 'app/containers/Login/SIGN_IN_WITH_EMAIL_SUCCESS';
export const SIGN_IN_WITH_EMAIL_ERROR = 'app/containers/Login/SIGN_IN_WITH_EMAIL_ERROR';

export const START_VERIFYING = 'app/containers/Login/START_VERIFYING';

export const VERIFY_EMAIL = 'app/containers/Login/VERIFY_EMAIL';
export const VERIFY_EMAIL_SUCCESS = 'app/containers/Login/VERIFY_EMAIL_SUCCESS';
export const VERIFY_EMAIL_ERROR = 'app/containers/Login/VERIFY_EMAIL_ERROR';

export const AUTOLOGIN_DATA = 'peeranhaAutoLogin';
export const PROFILE_INFO_LS = isSuiBlockchain ? 'suiprofileinfols' : 'profileinfols';
export const LOGIN_WITH_SUI = 'app/containers/Login/LOGIN_WITH_SUI';

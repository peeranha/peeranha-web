/*
 *
 * SignUp constants
 *
 */

// Fields

const EOS_NAME_FIELD = 'eos_name';
const EMAIL_FIELD = 'email';
const VERIFICATION_FIELD = 'verification';
const EOS_ACTIVE_PRIVATE_KEY_FIELD = 'eos_active_private_key';
const EOS_OWNER_PRIVATE_KEY_FIELD = 'eos_owner_private_key';
const STORE_KEY_FIELD = 'store_key';
const MASTER_KEY_FIELD = 'master_key';
const DISPLAY_NAME_FIELD = 'display_name';
const TELOS_NAME_FIELD = 'telos_name';
const MY_OWN_TELOS_NAME_FIELD = 'my_own_telos_name';
const PASSWORD_FIELD = 'password';
const PASSWORD_CONFIRM_FIELD = 'password_confirm';
const I_SAVE_MASTER_KEY_FIELD = 'i_save_master_key';
const I_ACCEPT_PRIVACY_POLICY_FIELD = 'i_accept_privacy_policy';
const WHY_DO_YOU_LIKE_US_FIELD = 'why_do_you_like_us';
const EOS_ACCOUNT_FIELD = 'ethereum_account';

// Action types

const SET_REDUCER_DEFAULT = 'app/SignUp/SET_REDUCER_DEFAULT';

const EMAIL_CHECKING = 'app/SignUp/EMAIL_CHECKING';
const EMAIL_CHECKING_SUCCESS = 'app/SignUp/EMAIL_CHECKING_SUCCESS';
const EMAIL_CHECKING_ERROR = 'app/SignUp/EMAIL_CHECKING_ERROR';

const EMAIL_VERIFICATION = 'app/SignUp/EMAIL_VERIFICATION';
const EMAIL_VERIFICATION_SUCCESS = 'app/SignUp/EMAIL_VERIFICATION_SUCCESS';
const EMAIL_VERIFICATION_ERROR = 'app/SignUp/EMAIL_VERIFICATION_ERROR';
const SEND_ANOTHER_CODE = 'app/SignUp/SEND_ANOTHER_CODE';

const I_HAVE_EOS_ACCOUNT = 'app/SignUp/I_HAVE_EOS_ACCOUNT';
const I_HAVE_EOS_ACCOUNT_SUCCESS = 'app/SignUp/I_HAVE_EOS_ACCOUNT_SUCCESS';
const I_HAVE_EOS_ACCOUNT_ERROR = 'app/SignUp/I_HAVE_EOS_ACCOUNT_ERROR';

const I_HAVE_NOT_EOS_ACCOUNT = 'app/SignUp/I_HAVE_NOT_EOS_ACCOUNT';
const I_HAVE_NOT_EOS_ACCOUNT_SUCCESS =
  'app/SignUp/I_HAVE_NOT_EOS_ACCOUNT_SUCCESS';
const I_HAVE_NOT_EOS_ACCOUNT_ERROR = 'app/SignUp/I_HAVE_NOT_EOS_ACCOUNT_ERROR';

const SIGNUP_WITH_WALLET = 'app/SignUp/SIGNUP_WITH_WALLET';
const SIGNUP_WITH_WALLET_SUCCESS = 'app/SignUp/SIGNUP_WITH_WALLET_SUCCESS';
const SIGNUP_WITH_WALLET_ERROR = 'app/SignUp/SIGNUP_WITH_WALLET_ERROR';
const SIGNUP_WITH_WALLET_REFERRAL_ERROR =
  'app/SignUp/SIGNUP_WITH_WALLET_REFERRAL_ERROR';

const SHOW_WALLET_SIGNUP_FORM = 'app/SignUp/SHOW_WALLET_SIGNUP_FORM';
const SHOW_WALLET_SIGNUP_FORM_SUCCESS =
  'app/SignUp/SHOW_WALLET_SIGNUP_FORM_SUCCESS';
const SHOW_WALLET_SIGNUP_FORM_ERROR =
  'app/SignUp/SHOW_WALLET_SIGNUP_FORM_ERROR';

const PUT_KEYS_TO_STATE = 'app/SignUp/PUT_KEYS_TO_STATE';

// Errors

const USER_ALREADY_REGISTERED_ERROR = 'USER_ALREADY_REGISTERED';
const USER_REJECTED_SIGNATURE_REQUEST_ERROR = 'USER_REJECTED_SIGNATURE_REQUEST';
const USER_IS_NOT_SELECTED_ERROR = 'USER_IS_NOT_SELECTED';

// Other
const ACCOUNT_NOT_CREATED_NAME = 'peeranhanone';
const AUTOGENERATED = 'autogenerated';
const MY_OWN = 'my_own';

export {
  SET_REDUCER_DEFAULT,
  EMAIL_CHECKING,
  EMAIL_CHECKING_SUCCESS,
  EMAIL_CHECKING_ERROR,
  EOS_NAME_FIELD,
  EMAIL_FIELD,
  VERIFICATION_FIELD,
  EOS_ACTIVE_PRIVATE_KEY_FIELD,
  EOS_OWNER_PRIVATE_KEY_FIELD,
  STORE_KEY_FIELD,
  MASTER_KEY_FIELD,
  DISPLAY_NAME_FIELD,
  TELOS_NAME_FIELD,
  MY_OWN_TELOS_NAME_FIELD,
  PASSWORD_FIELD,
  PASSWORD_CONFIRM_FIELD,
  I_SAVE_MASTER_KEY_FIELD,
  WHY_DO_YOU_LIKE_US_FIELD,
  EOS_ACCOUNT_FIELD,
  I_ACCEPT_PRIVACY_POLICY_FIELD,
  EMAIL_VERIFICATION,
  EMAIL_VERIFICATION_SUCCESS,
  EMAIL_VERIFICATION_ERROR,
  I_HAVE_EOS_ACCOUNT,
  I_HAVE_EOS_ACCOUNT_SUCCESS,
  I_HAVE_EOS_ACCOUNT_ERROR,
  I_HAVE_NOT_EOS_ACCOUNT,
  I_HAVE_NOT_EOS_ACCOUNT_SUCCESS,
  I_HAVE_NOT_EOS_ACCOUNT_ERROR,
  PUT_KEYS_TO_STATE,
  SIGNUP_WITH_WALLET,
  SIGNUP_WITH_WALLET_SUCCESS,
  SIGNUP_WITH_WALLET_ERROR,
  SIGNUP_WITH_WALLET_REFERRAL_ERROR,
  SHOW_WALLET_SIGNUP_FORM,
  SHOW_WALLET_SIGNUP_FORM_SUCCESS,
  SHOW_WALLET_SIGNUP_FORM_ERROR,
  USER_ALREADY_REGISTERED_ERROR,
  USER_REJECTED_SIGNATURE_REQUEST_ERROR,
  USER_IS_NOT_SELECTED_ERROR,
  ACCOUNT_NOT_CREATED_NAME,
  SEND_ANOTHER_CODE,
  AUTOGENERATED,
  MY_OWN,
};

import {
  SEND_EMAIL,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_ERROR,
  CONFIRM_EMAIL,
  CONFIRM_EMAIL_SUCCESS,
  CONFIRM_EMAIL_ERROR,
  SHOW_CHANGE_EMAIL_MODAL,
  SHOW_CHANGE_EMAIL_MODAL_SUCCESS,
  SHOW_CHANGE_EMAIL_MODAL_ERROR,
  HIDE_CHANGE_EMAIL_MODAL,
  CODE_FIELD,
  SEND_ANOTHER_CODE,
  SEND_VERIFICATION_CODE,
  GET_EMAIL_ADDRESS,
  GET_EMAIL_ADDRESS_SUCCESS,
  GET_EMAIL_ADDRESS_ERROR,
  EMAIL_FIELD,
  UNSUBSCRIBE_EMAIL_ADDRESS,
  UNSUBSCRIBE_EMAIL_ADDRESS_SUCCESS,
  UNSUBSCRIBE_EMAIL_ADDRESS_ERROR,
} from './constants';

import { sendRequestType, argsType } from './types';

export function sendAnotherCode(): sendRequestType {
  return {
    type: SEND_ANOTHER_CODE,
  };
}

export function sendVerificationCodeSuccess(): sendRequestType {
  return {
    type: SEND_VERIFICATION_CODE,
  };
}

export function showChangeEmailModal(...args: argsType): {
  type: string;
  email: string;
} {
  return {
    type: SHOW_CHANGE_EMAIL_MODAL,
    email: args[0].toJS()[EMAIL_FIELD],
  };
}

export function showChangeEmailModalSuccess(email: string): {
  type: string;
  currentEmail: string;
} {
  return {
    type: SHOW_CHANGE_EMAIL_MODAL_SUCCESS,
    currentEmail: email,
  };
}

export function showChangeEmailModalErr(
  showChangeEmailModalError: unknown | string,
): {
  type: string;
  showChangeEmailModalError: unknown | string;
} {
  return {
    type: SHOW_CHANGE_EMAIL_MODAL_ERROR,
    showChangeEmailModalError,
  };
}

export function hideChangeEmailModal(): sendRequestType {
  return {
    type: HIDE_CHANGE_EMAIL_MODAL,
  };
}

export function sendEmail(...args: argsType): {
  type: string;
  email: string;
} {
  return {
    type: SEND_EMAIL,
    email: args[2].emailAddress,
  };
}

export function sendEmailSuccess(): sendRequestType {
  return {
    type: SEND_EMAIL_SUCCESS,
  };
}

export function sendEmailErr(sendEmailError: unknown | string): {
  type: string;
  sendEmailError: unknown | string;
} {
  return {
    type: SEND_EMAIL_ERROR,
    sendEmailError,
  };
}

export function confirmEmail(...args: argsType): {
  type: string;
  code: string;
} {
  return {
    type: CONFIRM_EMAIL,
    code: args[0].toJS()[CODE_FIELD],
  };
}

export function confirmEmailSuccess(
  email: unknown | string,
  isSubscribed: boolean,
): {
  type: string;
  email: unknown | string;
  isSubscribed: boolean;
} {
  return {
    type: CONFIRM_EMAIL_SUCCESS,
    email,
    isSubscribed,
  };
}

export function confirmEmailErr(confirmEmailError: unknown | string): {
  type: string;
  confirmEmailError: unknown | string;
} {
  return {
    type: CONFIRM_EMAIL_ERROR,
    confirmEmailError,
  };
}

export function getEmailAddress(address: string): {
  type: string;
  address: string;
} {
  return {
    type: GET_EMAIL_ADDRESS,
    address,
  };
}

export function getEmailAddressSuccess(
  email: string,
  isSubscribed: boolean,
): {
  type: string;
  email: string;
  isSubscribed: boolean;
} {
  return {
    type: GET_EMAIL_ADDRESS_SUCCESS,
    email,
    isSubscribed,
  };
}

export function getEmailAddressErr(getEmailAddressError: unknown | string): {
  type: string;
  getEmailAddressError: unknown | string;
} {
  return {
    type: GET_EMAIL_ADDRESS_ERROR,
    getEmailAddressError,
  };
}

export function unsubscribeEmailAddress(subscribe: boolean): {
  type: string;
  subscribe: boolean;
} {
  return {
    type: UNSUBSCRIBE_EMAIL_ADDRESS,
    subscribe,
  };
}

export function unsubscribeEmailAddressSuccess(): sendRequestType {
  return {
    type: UNSUBSCRIBE_EMAIL_ADDRESS_SUCCESS,
  };
}

export function unsubscribeEmailAddressErr(
  unsubscribeEmailAddressError: unknown | string,
): { type: string; unsubscribeEmailAddressError: unknown | string } {
  return {
    type: UNSUBSCRIBE_EMAIL_ADDRESS_ERROR,
    unsubscribeEmailAddressError,
  };
}

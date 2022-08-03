/* eslint consistent-return: 0 */
import { takeEvery, put, select, call } from 'redux-saga/effects';

import { translationMessages } from 'i18n';
import messages from 'common-messages';

import {
  ApplicationError,
  WebIntegrationError,
  BlockchainError,
  WebIntegrationErrorByCode,
} from 'utils/errors';

import { logError } from 'utils/web_integration/src/logger/index';
import { ENDPOINTS_LIST } from 'utils/constants';
import { getCookie } from 'utils/cookie';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { makeSelectAccount } from 'containers/AccountProvider/selectors';
import blockchainErrorMsgs from 'containers/ErrorPage/blockchainErrors';
import { AUTOLOGIN_DATA } from 'containers/Login/constants';

import { ADD_TOAST, REMOVE_TIMEOUT } from './constants';
import { addToast, removeToast } from './actions';
import { makeSelectToasts } from './selectors';

import { errHandlingTypes, otherTypes } from './imports';
import errorMessages from 'errorsByCode';
import {
  TRANSACTION_COMPLETED,
  TRANSACTION_FAILED,
} from '../EthereumProvider/constants';

export function* errHandling(error) {
  const locale = yield select(makeSelectLocale());
  const msg = translationMessages[locale];

  try {
    const key = Object.keys(error).find(x => x.toLowerCase().match('err'));
    const errorValue = error[key];

    if (errorValue instanceof WebIntegrationErrorByCode) {
      if (isNaN(errorValue?.message)) {
        const errObjWrapper = errorValue.message;
        const errorCode = JSON.parse(errObjWrapper).error.code;
        throw msg[errorMessages[errorCode].id];
      } else {
        throw msg[errorMessages[errorValue.message].id];
      }
    }

    if (errorValue instanceof ApplicationError) {
      return null;
    }

    if (errorValue instanceof WebIntegrationError) {
      throw errorValue.message;
    }

    if (errorValue instanceof BlockchainError) {
      let errorCode = null;

      try {
        errorCode = Object.keys(blockchainErrorMsgs).find(x =>
          errorValue.message
            .toLowerCase()
            .includes(blockchainErrorMsgs[x].keywords.toLowerCase()),
        );
      } catch (err) {
        throw new Error('Unknown error');
      }

      if (errorCode) {
        throw msg[blockchainErrorMsgs[errorCode].id];
      }
    }

    throw new Error('Unknown error');
  } catch (catchError) {
    yield put(
      addToast({
        type: 'error',
        text:
          typeof catchError === 'string'
            ? catchError
            : msg[messages.errorMessage.id],
      }),
    );
  }
}

export function* successHandling() {
  const locale = yield select(makeSelectLocale());
  const msg = translationMessages[locale];
  yield put(
    addToast({
      type: 'success',
      text: msg[messages.transactionCompleted.id],
    }),
  );
}

export function* addToastWorker() {
  const toasts = yield select(makeSelectToasts());
  const { toastKey } = toasts[toasts.length - 1];

  yield new Promise(resolve => {
    setTimeout(resolve, REMOVE_TIMEOUT);
  });

  yield put(removeToast(toastKey));
}

export function* loggerWorker(error) {
  try {
    const key = Object.keys(error).find(x => x.toLowerCase().match('err'));

    const user = yield select(makeSelectAccount());

    if (
      process.env.NODE_ENV !== 'production' ||
      (process.env.NODE_ENV === 'production' && process.env.IS_TEST_ENV)
    ) {
      console.log(error[key]);
    }

    if (error[key] instanceof ApplicationError) {
      return null;
    }

    const endpointsData = JSON.parse(localStorage.getItem(ENDPOINTS_LIST));
    const loginData = JSON.parse(getCookie(AUTOLOGIN_DATA) || null);

    yield call(logError, {
      user: user || 'none',
      error: JSON.stringify({
        message:
          typeof error[key] === 'string' ? error[key] : error[key].message,
        stack: error[key].stack,
        node:
          (endpointsData && endpointsData.nodes[0]) ||
          process.env.EOS_ENDPOINT_DEFAULT,
        isScatter: loginData ? Boolean(loginData.loginWithScatter) : false,
        userAgent: navigator.userAgent,
      }),
    });
  } catch (err) {
    console.log('Logger error: ', err.message);
  }
}

export default function*() {
  yield takeEvery(ADD_TOAST, addToastWorker);
  yield takeEvery(TRANSACTION_FAILED, errHandling);
  yield takeEvery([...otherTypes, ...errHandlingTypes], loggerWorker);
  yield takeEvery(TRANSACTION_COMPLETED, successHandling);
}

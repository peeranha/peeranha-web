/* eslint consistent-return: 0 */
import { takeEvery, put, select } from 'redux-saga/effects';

import { translationMessages } from 'i18n';
import messages from 'common-messages';

import {
  ApplicationError,
  WebIntegrationError,
  BlockchainError,
} from 'utils/errors';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import blockchainErrorMsgs from 'containers/ErrorPage/blockchainErrors';

import { ADD_TOAST, REMOVE_TIMEOUT } from './constants';
import { addToast, removeToast } from './actions';
import { makeSelectToasts } from './selectors';

import { errHandlingTypes, successHandlingTypes, otherTypes } from './imports';

export function* errHandling(error) {
  const locale = yield select(makeSelectLocale());
  const msg = translationMessages[locale];

  try {
    const key = Object.keys(error).find(x => x.toLowerCase().match('err'));
    const errorValue = error[key];

    if (
      process.env.NODE_ENV !== 'production' ||
      (process.env.NODE_ENV === 'production' && process.env.IS_TEST_ENV)
    ) {
      console.log(errorValue);
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
      text: msg[messages.successMessage.id],
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

    if (error[key] instanceof ApplicationError) {
      return null;
    }

    // yield call(
    //   putLogEvent,
    //   typeof error[key] === 'string' ? error[key] : error[key].message,
    //   error[key].stack,
    // );
  } catch (err) {
    console.log('Logger error: ', err.message);
  }
}

export default function*() {
  yield takeEvery(ADD_TOAST, addToastWorker);
  yield takeEvery(errHandlingTypes, errHandling);
  yield takeEvery([...otherTypes, ...errHandlingTypes], loggerWorker);
  yield takeEvery(successHandlingTypes, successHandling);
}

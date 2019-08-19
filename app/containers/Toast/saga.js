import { takeLatest, put, select } from 'redux-saga/effects';

import { translationMessages } from 'i18n';
import commonMessages from 'common-messages';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import { ADD_TOAST, REMOVE_TIMEOUT } from './constants';
import { addToast, removeToast } from './actions';
import { makeSelectToasts } from './selectors';

export function* addToastWorker() {
  const toasts = yield select(makeSelectToasts());

  yield new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, REMOVE_TIMEOUT);
  });

  const { toastKey } = toasts[toasts.length - 1];

  yield put(removeToast(toastKey));
}

export function* errorToastHandling(error) {
  const key = Object.keys(error).find(x => x.toLowerCase().match('err'));

  yield put(
    addToast({
      type: 'error',
      text: error[key],
    }),
  );
}

export function* errorToastHandlingWithDefaultText() {
  const locale = yield select(makeSelectLocale());

  yield put(
    addToast({
      type: 'error',
      text: translationMessages[locale][commonMessages.errorMessage.id],
    }),
  );
}

export function* successToastHandlingWithDefaultText() {
  const locale = yield select(makeSelectLocale());

  yield put(
    addToast({
      type: 'success',
      text: translationMessages[locale][commonMessages.successMessage.id],
    }),
  );
}

export default function*() {
  yield takeLatest(ADD_TOAST, addToastWorker);
}

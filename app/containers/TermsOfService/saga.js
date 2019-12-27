import { takeLatest, call, put, select } from 'redux-saga/effects';
import { getMD } from 'utils/mdManagement';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import { getTermsSuccess, getTermsErr } from './actions';
import { GET_TERMS } from './constants';

/* eslint global-require: 0 */
export function* getTermsWorker() {
  try {
    const prefix = 'terms-of-service';
    const locale = yield select(makeSelectLocale());
    const terms = yield call(getMD, prefix, locale);

    yield put(getTermsSuccess(terms));
  } catch (err) {
    yield put(getTermsErr(err));
  }
}

export default function* defaultSaga() {
  yield takeLatest(GET_TERMS, getTermsWorker);
}

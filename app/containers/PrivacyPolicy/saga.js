import { takeLatest, call, put, select } from 'redux-saga/effects';
import { getMD } from 'utils/mdManagement';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import { getPrivacyPolicySuccess, getPrivacyPolicyErr } from './actions';
import { GET_PRIVACY_POLICY } from './constants';

/* eslint global-require: 0 */
export function* getPrivacyPolicyWorker() {
  try {
    const prefix = 'privacy-policy';
    const locale = yield select(makeSelectLocale());
    const privacyPolicy = yield call(getMD, prefix, locale);

    yield put(getPrivacyPolicySuccess(privacyPolicy));
  } catch (err) {
    yield put(getPrivacyPolicyErr(err));
  }
}

export default function* defaultSaga() {
  yield takeLatest(GET_PRIVACY_POLICY, getPrivacyPolicyWorker);
}

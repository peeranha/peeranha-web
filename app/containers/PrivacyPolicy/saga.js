import { takeLatest, call, put, select } from 'redux-saga/effects';
import { getPrivacyPolicy } from 'utils/privacyPolicyManagement';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import { getPrivacyPolicySuccess, getPrivacyPolicyErr } from './actions';
import { GET_PRIVACY_POLICY } from './constants';

/* eslint global-require: 0 */
export function* getPrivacyPolicyWorker() {
  try {
    const locale = yield select(makeSelectLocale());
    const privacyPolicy = yield call(() => getPrivacyPolicy(locale));

    yield put(getPrivacyPolicySuccess(privacyPolicy));
  } catch (err) {
    yield put(getPrivacyPolicyErr(err.message));
  }
}

export default function* defaultSaga() {
  yield takeLatest(GET_PRIVACY_POLICY, getPrivacyPolicyWorker);
}

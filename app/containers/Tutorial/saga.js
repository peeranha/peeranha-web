import { takeLatest, call, put, select } from 'redux-saga/effects';
import { getMD } from 'utils/mdManagement';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import { getTutorialSuccess, getTutorialErr } from './actions';
import { GET_TUTORIAL } from './constants';

/* eslint global-require: 0 */
export function* getTutorialWorker() {
  try {
    const prefix = 'tutorial';
    const locale = yield select(makeSelectLocale());
    const tutorial = yield call(getMD, prefix, locale);

    yield put(getTutorialSuccess(tutorial));
  } catch (err) {
    yield put(getTutorialErr(err));
  }
}

export default function* defaultSaga() {
  yield takeLatest(GET_TUTORIAL, getTutorialWorker);
}

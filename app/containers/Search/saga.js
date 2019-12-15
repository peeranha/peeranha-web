import { takeEvery, put, call } from 'redux-saga/effects';
import { getResults } from 'utils/custom-search';

import { GET_RESULTS } from './constants';
import { getResultsSuccess, getResultsErr } from './actions';

export function* sendTokensWorker({ query }) {
  try {
    const items = yield call(getResults, query);
    yield put(getResultsSuccess(items));
  } catch (err) {
    yield put(getResultsErr(err));
  }
}

export default function* defaultSaga() {
  yield takeEvery(GET_RESULTS, sendTokensWorker);
}

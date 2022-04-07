import { takeEvery, put, call } from 'redux-saga/effects';
import { getResults } from 'utils/custom-search';

import { GET_RESULTS } from './constants';
import { getResultsSuccess, getResultsErr } from './actions';
import { isSingleCommunityWebsite } from '../../utils/communityManagement';

export function* searchWorker({ query }) {
  try {
    const single = isSingleCommunityWebsite();
    const items = yield call(getResults, query, single);
    yield put(getResultsSuccess(items));
  } catch (err) {
    yield put(getResultsErr(err));
  }
}

export default function* defaultSaga() {
  yield takeEvery(GET_RESULTS, searchWorker);
}

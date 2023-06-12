import { takeEvery, put, call } from 'redux-saga/effects';
import { getResults } from 'utils/custom-search';
import { isSingleCommunityWebsite, singleSubcommunity } from 'utils/communityManagement';

import { GET_RESULTS } from './constants';
import { getResultsSuccess, getResultsErr } from './actions';

export function* searchWorker({ query }) {
  try {
    const single = isSingleCommunityWebsite();
    const subcommunityIds = singleSubcommunity();
    const communityIds = single ? [single, ...subcommunityIds] : false;

    const items = yield call(getResults, query, communityIds);
    yield put(getResultsSuccess(items));
  } catch (err) {
    yield put(getResultsErr(err));
  }
}

export default function* defaultSaga() {
  yield takeEvery(GET_RESULTS, searchWorker);
}

import { takeEvery, put, call } from 'redux-saga/effects';
import ReactGA from 'react-ga4';

import { getResults } from 'utils/custom-search';
import { isSingleCommunityWebsite } from 'utils/communityManagement';

import { GET_RESULTS } from './constants';
import { getResultsSuccess, getResultsErr } from './actions';

export function* searchWorker({ query }) {
  try {
    ReactGA.event({
      category: 'Users',
      action: 'normal_search_started',
    });
    const single = isSingleCommunityWebsite();
    const items = yield call(getResults, query, single);
    yield put(getResultsSuccess(items));
    ReactGA.event({
      category: 'Users',
      action: 'normal_search_completed',
    });
  } catch (err) {
    yield put(getResultsErr(err));
  }
}

export default function* defaultSaga() {
  yield takeEvery(GET_RESULTS, searchWorker);
}

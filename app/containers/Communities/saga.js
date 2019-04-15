import { call, put, takeLatest, select } from 'redux-saga/effects';

import { getSuggestedCommunities } from 'utils/communityManagement';

import { selectEos } from 'containers/EosioProvider/selectors';

import { GET_SUGGESTED_COMMUNITIES } from './constants';
import {
  getSuggestedCommunitiesSuccess,
  getSuggestedCommunitiesErr,
} from './actions';

import { selectSuggestedCommunities, selectLimit } from './selectors';

export function* getSuggestedCommunitiesWorker() {
  try {
    const eosService = yield select(selectEos);
    const storedComm = yield select(selectSuggestedCommunities());
    const limit = yield select(selectLimit());

    // Lower bound - is ID of community
    const lowerBound = storedComm[storedComm.length - 1]
      ? +storedComm[storedComm.length - 1].id + 1
      : 0;

    const communities = yield call(() =>
      getSuggestedCommunities(eosService, lowerBound, limit),
    );

    yield put(getSuggestedCommunitiesSuccess(communities));
  } catch (err) {
    yield put(getSuggestedCommunitiesErr(err.message));
  }
}

export default function*() {
  yield takeLatest(GET_SUGGESTED_COMMUNITIES, getSuggestedCommunitiesWorker);
}

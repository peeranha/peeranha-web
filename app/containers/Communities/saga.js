import { call, put, takeLatest, select } from 'redux-saga/effects';

import { getSuggestedCommunities } from 'utils/communityManagement';

import { selectEos } from 'containers/EosioProvider/selectors';

import { GET_SUGGESTED_COMMUNITIES } from './constants';
import {
  getSuggestedCommunitiesSuccess,
  getSuggestedCommunitiesErr,
} from './actions';

export function* getSuggestedCommunitiesWorker() {
  try {
    const eosService = yield select(selectEos);
    const communities = yield call(() => getSuggestedCommunities(eosService));

    yield put(getSuggestedCommunitiesSuccess(communities));
  } catch (err) {
    yield put(getSuggestedCommunitiesErr(err.message));
  }
}

export default function*() {
  yield takeLatest(GET_SUGGESTED_COMMUNITIES, getSuggestedCommunitiesWorker);
}

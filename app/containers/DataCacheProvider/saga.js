import { takeLatest, call, put, select } from 'redux-saga/effects';

import { selectEos } from 'containers/EosioProvider/selectors';
import { getAllCommunities } from 'utils/communityManagement';

import {
  getCommunitiesWithTagsSuccess,
  getCommunitiesWithTagsErr,
} from './actions';

import { GET_COMMUNITIES_WITH_TAGS } from './constants';

export function* getCommunitiesWithTagsWorker() {
  try {
    const eosService = yield select(selectEos);
    const communities = yield call(() => getAllCommunities(eosService));

    yield put(getCommunitiesWithTagsSuccess(communities));
  } catch (err) {
    yield put(getCommunitiesWithTagsErr(err));
  }
}

export default function*() {
  yield takeLatest(GET_COMMUNITIES_WITH_TAGS, getCommunitiesWithTagsWorker);
}

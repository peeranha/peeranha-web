import { call, put, takeLatest, select } from 'redux-saga/effects';

import { getSuggestedTags } from 'utils/communityManagement';

import { selectEos } from 'containers/EosioProvider/selectors';

import { GET_SUGGESTED_TAGS } from './constants';
import { getSuggestedTagsSuccess, getSuggestedTagsErr } from './actions';

export function* getSuggestedTagsWorker({ communityId }) {
  try {
    const eosService = yield select(selectEos);
    const tags = yield call(() => getSuggestedTags(eosService, communityId));

    yield put(getSuggestedTagsSuccess(tags));
  } catch (err) {
    yield put(getSuggestedTagsErr(err.message));
  }
}
export default function*() {
  yield takeLatest(GET_SUGGESTED_TAGS, getSuggestedTagsWorker);
}

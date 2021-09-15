import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import { isSingleCommunityWebsite } from 'utils/communityManagement';
import { getUserProfileSuccess } from 'containers/DataCacheProvider/actions';

import { GET_USERS } from './constants';
import { getUsersSuccess, getUsersErr } from './actions';
import {
  selectLastUserId,
  selectLimit,
  selectSkip,
  selectSorting,
} from './selectors';
import { selectEthereum } from '../EthereumProvider/selectors';
import { getUsers } from '../../utils/theGraph';

export function* getUsersWorker({ loadMore, reload }) {
  try {
    console.log(reload);
    const limit = yield select(selectLimit());
    const sorting = yield select(selectSorting());
    let skip = reload ? 0 : yield select(selectSkip());
    const singleCommunityId = isSingleCommunityWebsite();
    let users;
    let more = true;

    users = yield getUsers({ limit, skip, sorting });
    yield put(getUsersSuccess(users, loadMore, reload));
  } catch (err) {
    yield put(getUsersErr(err));
  }
}

export default function*() {
  yield takeLatest(GET_USERS, getUsersWorker);
}

import { call, put, takeLatest } from 'redux-saga/effects';
import { getFileUrl } from 'utils/ipfs';

import { GET_USERS } from './constants';
import { getUsersSuccess, getUsersErr } from './actions';

export function* getUsersWorker({ loadMore, fetcher }) {
  try {
    const { items } = yield call(() => fetcher.getNextItems());

    const users = items.map(x => ({
      ...x,
      ipfs_avatar: getFileUrl(x.ipfs_avatar),
    }));

    yield put(getUsersSuccess(users, loadMore));
  } catch (err) {
    yield put(getUsersErr(err.message));
  }
}

export default function*() {
  yield takeLatest(GET_USERS, getUsersWorker);
}

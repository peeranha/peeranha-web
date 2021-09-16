import { put, takeLatest, select } from 'redux-saga/effects';

import { GET_USERS } from './constants';
import { getUsersSuccess, getUsersErr } from './actions';
import { selectLimit, selectSkip, selectSorting } from './selectors';
import { getUsers } from '../../utils/theGraph';

export function* getUsersWorker({ loadMore, reload }) {
  try {
    const limit = yield select(selectLimit());
    const sorting = yield select(selectSorting());
    let skip = reload ? 0 : yield select(selectSkip());
    let users;

    users = yield getUsers({ limit, skip, sorting });
    yield put(getUsersSuccess(users, loadMore, reload));
  } catch (err) {
    yield put(getUsersErr(err));
  }
}

export default function*() {
  yield takeLatest(GET_USERS, getUsersWorker);
}

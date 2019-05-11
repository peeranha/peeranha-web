import { call, put, takeLatest, select } from 'redux-saga/effects';

import { getUsers } from 'utils/profileManagement';

import { selectEos } from 'containers/EosioProvider/selectors';

import { GET_USERS } from './constants';
import { getUsersSuccess, getUsersErr } from './actions';
import { selectLimit, selectUsers } from './selectors';

export function* getUsersWorker({ loadMore }) {
  try {
    const eosService = yield select(selectEos);
    const storedUsers = yield select(selectUsers());
    const limit = yield select(selectLimit());

    // Lower bound - is ID of user
    let lowerBound = 0;

    if (loadMore) {
      lowerBound = yield storedUsers[storedUsers.length - 1]
        ? storedUsers[storedUsers.length - 1].user
        : 0;
    }

    // slice(1) - lowerbound is string
    const users = yield call(() => getUsers(lowerBound, limit, eosService));

    yield put(getUsersSuccess(lowerBound ? users.slice(1) : users, loadMore));
  } catch (err) {
    yield put(getUsersErr(err.message));
  }
}

export default function*() {
  yield takeLatest(GET_USERS, getUsersWorker);
}

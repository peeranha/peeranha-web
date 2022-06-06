import { put, takeLatest, select } from 'redux-saga/effects';

import { GET_USERS } from './constants';
import { getUsersSuccess, getUsersErr } from './actions';
import { selectLimit, selectSkip, selectSorting } from './selectors';
import { getUsers } from '../../utils/theGraph';

export function* getUsersWorker({ loadMore, reload, communityId }) {
  try {
    const limit = yield select(selectLimit());
    const sorting = yield select(selectSorting());
    const skip = reload ? 0 : yield select(selectSkip());
    let users = yield getUsers({ limit, skip, sorting });

    if (!Number.isNaN(communityId))
      users = users.filter(user =>
        user.followedCommunities
          .map(item => Number(item))
          .includes(communityId),
      );
    yield put(getUsersSuccess(users, loadMore, reload));
  } catch (err) {
    yield put(getUsersErr(err));
  }
}

export default function*() {
  yield takeLatest(GET_USERS, getUsersWorker);
}

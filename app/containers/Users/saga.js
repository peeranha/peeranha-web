import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import { isSingleCommunityWebsite } from 'utils/communityManagement';
import { getUserProfileSuccess } from 'containers/DataCacheProvider/actions';

import { GET_USERS } from './constants';
import { getUsersSuccess, getUsersErr } from './actions';
import { selectLimit } from './selectors';

export function* getUsersWorker({ loadMore, fetcher }) {
  try {
    let users = [];

    const limit = yield select(selectLimit());
    const singleCommId = +isSingleCommunityWebsite();

    const { more, items: mainUsers } = yield call(() => fetcher.getNextItems());

    users = mainUsers;

    // Fix blockchain bug (items limit in response !== required limit if $more is true)
    if (users.length < limit && more) {
      const { items: addUsers } = yield call(() => fetcher.getNextItems());
      users = [...users, ...addUsers];
    }

    if (singleCommId) {
      users = users.filter(x => x.followed_communities.includes(singleCommId));
    }

    yield all(users.map(profile => put(getUserProfileSuccess(profile))));

    yield put(getUsersSuccess(users, loadMore));
  } catch (err) {
    yield put(getUsersErr(err));
  }
}

export default function*() {
  yield takeLatest(GET_USERS, getUsersWorker);
}

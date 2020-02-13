import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import { isSingleCommunityWebsite } from 'utils/communityManagement';
import { getUserProfileSuccess } from 'containers/DataCacheProvider/actions';

import { GET_USERS } from './constants';
import { getUsersSuccess, getUsersErr } from './actions';
import { selectLimit } from './selectors';

export function* getUsersWorker({ loadMore, fetcher }) {
  try {
    const limit = yield select(selectLimit());
    const singleCommunityId = isSingleCommunityWebsite();
    let users = [];
    let more = true;
    while (users.length < limit && more) {
      const { more: hasMore, items } = yield call(() => fetcher.getNextItems());
      if (singleCommunityId) {
        users = [
          ...users,
          ...items.filter(user =>
            user.followed_communities.includes(singleCommunityId),
          ),
        ];
      } else {
        users = [...users, ...items];
      }

      more = hasMore;
      yield all(users.map(profile => put(getUserProfileSuccess(profile))));
    }

    yield put(getUsersSuccess(users, loadMore));
  } catch (err) {
    yield put(getUsersErr(err));
  }
}

export default function*() {
  yield takeLatest(GET_USERS, getUsersWorker);
}

import { selectCommunities } from 'containers/DataCacheProvider/selectors';
import { put, takeLatest, select, call } from 'redux-saga/effects';
import { getSuiUsers, getSuiUsersFromContract } from 'utils/sui/suiIndexer';
import { IS_INDEXER_ON, isSuiBlockchain } from 'utils/sui/sui';
import { getUsers, getUsersByCommunity } from 'utils/theGraph';

import { GET_USERS } from './constants';
import { getUsersSuccess, getUsersErr } from './actions';
import { selectLimit, selectSkip, selectSorting } from './selectors';

export function* getUsersWorker({ loadMore, reload, communityId }) {
  try {
    if (isSuiBlockchain) {
      let users = [];
      if (IS_INDEXER_ON) {
        const communities = yield select(selectCommunities());
        users = yield call(getSuiUsers, communities);
      } else {
        users = yield call(getSuiUsersFromContract);
      }
      yield put(getUsersSuccess(users, false, false));
    } else {
      const limit = yield select(selectLimit());
      const sorting = yield select(selectSorting());
      const skip = reload ? 0 : yield select(selectSkip());

      const users =
        communityId === 0
          ? yield getUsers({ limit, skip, sorting })
          : yield getUsersByCommunity({ limit, skip, communityId });

      yield put(getUsersSuccess(users, loadMore, reload));
    }
  } catch (err) {
    yield put(getUsersErr(err));
  }
}

export default function* () {
  yield takeLatest(GET_USERS, getUsersWorker);
}

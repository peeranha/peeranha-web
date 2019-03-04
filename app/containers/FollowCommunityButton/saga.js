import { takeLatest, call, put, select } from 'redux-saga/effects';

import { followCommunity, unfollowCommunity } from 'utils/communityManagement';

import { selectEos } from 'containers/EosioProvider/selectors';
import { getCurrentAccountSuccess } from 'containers/AccountProvider/actions';
import { getUserProfileWorker } from 'containers/DataCacheProvider/saga';

import { FOLLOW_HANDLER } from './constants';

import { followHandlerSuccess, followHandlerErr } from './actions';

export function* followHandlerWorker({ communityIdFilter, isFollowed }) {
  try {
    const eosService = yield select(selectEos);
    const selectedAccount = yield call(() => eosService.getSelectedAccount());

    if (isFollowed) {
      yield call(() =>
        unfollowCommunity(eosService, communityIdFilter, selectedAccount),
      );
    } else {
      yield call(() =>
        followCommunity(eosService, communityIdFilter, selectedAccount),
      );
    }

    const profile = yield call(() =>
      getUserProfileWorker({ user: selectedAccount }),
    );

    yield put(getCurrentAccountSuccess(selectedAccount, profile));

    yield put(followHandlerSuccess());
  } catch (err) {
    yield put(followHandlerErr(err.message));
  }
}

export default function*() {
  yield takeLatest(FOLLOW_HANDLER, followHandlerWorker);
}

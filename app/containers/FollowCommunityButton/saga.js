import { takeLatest, call, put, select } from 'redux-saga/effects';

import { followCommunity, unfollowCommunity } from 'utils/communityManagement';

import { showLoginModal } from 'containers/Login/actions';

import { selectEos } from 'containers/EosioProvider/selectors';
import { makeSelectProfileInfo } from 'containers/AccountProvider/selectors';

import { FOLLOW_HANDLER } from './constants';

import { followHandlerSuccess, followHandlerErr } from './actions';

export function* followHandlerWorker({ communityIdFilter, isFollowed }) {
  try {
    const eosService = yield select(selectEos);
    const selectedAccount = yield call(() => eosService.getSelectedAccount());

    const profileInfo = yield select(makeSelectProfileInfo());

    if (!profileInfo) {
      yield put(showLoginModal());
      throw new Error('Not authorized');
    }

    if (isFollowed) {
      yield call(() =>
        unfollowCommunity(eosService, communityIdFilter, selectedAccount),
      );
    } else {
      yield call(() =>
        followCommunity(eosService, communityIdFilter, selectedAccount),
      );
    }

    yield put(followHandlerSuccess({ communityIdFilter, isFollowed }));
  } catch (err) {
    yield put(followHandlerErr(err.message));
  }
}

export default function*() {
  yield takeLatest(FOLLOW_HANDLER, followHandlerWorker);
}

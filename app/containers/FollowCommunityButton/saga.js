import { takeLatest, call, put, select } from 'redux-saga/effects';

import { followCommunity, unfollowCommunity } from 'utils/communityManagement';

import { selectEos } from 'containers/EosioProvider/selectors';
import { isAuthorized, isValid } from 'containers/EosioProvider/saga';

import {
  FOLLOW_HANDLER,
  MIN_RATING_TO_FOLLOW,
  MIN_ENERGY_TO_FOLLOW,
} from './constants';

import { followHandlerSuccess, followHandlerErr } from './actions';

export function* followHandlerWorker({
  communityIdFilter,
  isFollowed,
  buttonId,
}) {
  try {
    const eosService = yield select(selectEos);
    const selectedAccount = yield call(eosService.getSelectedAccount);

    yield call(isAuthorized);

    yield call(isValid, {
      buttonId,
      minRating: MIN_RATING_TO_FOLLOW,
      minEnergy: MIN_ENERGY_TO_FOLLOW,
    });

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

import { call, put, takeLatest, select } from 'redux-saga/effects';
import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import { createCommunity } from 'utils/communityManagement';

import { selectEos } from 'containers/EosioProvider/selectors';
import { isAuthorized, isValid } from 'containers/EosioProvider/saga';

import {
  successToastHandlingWithDefaultText,
  errorToastHandlingWithDefaultText,
} from 'containers/Toast/saga';

import { getSuggestedCommunities } from 'containers/Communities/actions';

import { createCommunitySuccess, createCommunityErr } from './actions';

import {
  CREATE_COMMUNITY,
  CREATE_COMMUNITY_SUCCESS,
  CREATE_COMMUNITY_ERROR,
  CREATE_COMMUNITY_BUTTON,
  MIN_RATING_TO_CREATE_COMMUNITY,
  MIN_ENERGY_TO_CREATE_COMMUNITY,
} from './constants';

export function* createCommunityWorker({ community, reset }) {
  try {
    const eosService = yield select(selectEos);
    const selectedAccount = yield call(eosService.getSelectedAccount);

    yield call(createCommunity, eosService, selectedAccount, community);

    yield put(getSuggestedCommunities(true));

    yield put(createCommunitySuccess());

    yield call(reset);

    yield call(createdHistory.push, routes.communitiesCreatedBanner());
  } catch ({ message }) {
    yield put(createCommunityErr(message));
  }
}

export function* checkReadinessWorker({ buttonId }) {
  yield call(isAuthorized);

  yield call(isValid, {
    buttonId: buttonId || CREATE_COMMUNITY_BUTTON,
    minRating: MIN_RATING_TO_CREATE_COMMUNITY,
    minEnergy: MIN_ENERGY_TO_CREATE_COMMUNITY,
  });
}

/* eslint no-empty: 0 */
export function* redirectToCreateCommunityWorker({ buttonId }) {
  try {
    yield call(checkReadinessWorker, { buttonId });
    yield call(createdHistory.push, routes.communitiesCreate());
  } catch (err) {}
}

export default function*() {
  yield takeLatest(CREATE_COMMUNITY, createCommunityWorker);
  yield takeLatest(
    CREATE_COMMUNITY_SUCCESS,
    successToastHandlingWithDefaultText,
  );
  yield takeLatest(CREATE_COMMUNITY_ERROR, errorToastHandlingWithDefaultText);
}

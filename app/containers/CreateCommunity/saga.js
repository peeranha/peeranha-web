import { call, put, takeLatest, select } from 'redux-saga/effects';
import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import { createCommunity } from 'utils/communityManagement';

import { selectEos } from 'containers/EosioProvider/selectors';
import { isAuthorized, isValid } from 'containers/EosioProvider/saga';

import {
  selectUserRating,
  selectUserEnergy,
  makeSelectAccount,
  selectIsGlobalModerator,
} from 'containers/AccountProvider/selectors';

import { getSuggestedCommunities } from 'containers/Communities/actions';

import {
  createCommunitySuccess,
  createCommunityErr,
  getFormProcessing,
  getFormSuccess,
  getFormError,
} from './actions';

import {
  CREATE_COMMUNITY,
  CREATE_COMMUNITY_BUTTON,
  MIN_RATING_TO_CREATE_COMMUNITY,
  MIN_ENERGY_TO_CREATE_COMMUNITY,
  GET_FORM,
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
  } catch (err) {
    yield put(createCommunityErr(err));
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

export function* getFormWorker() {
  try {
    yield put(getFormProcessing());

    const account = yield select(makeSelectAccount());
    const userRating = yield select(selectUserRating());
    const userEnergy = yield select(selectUserEnergy());
    const isGlobalModerator = yield select(selectIsGlobalModerator());

    if (
      !account ||
      ((userRating < MIN_RATING_TO_CREATE_COMMUNITY ||
        userEnergy < MIN_ENERGY_TO_CREATE_COMMUNITY) &&
        !isGlobalModerator)
    ) {
      yield put(getFormSuccess(false));
    } else {
      yield put(getFormSuccess(true));
    }
  } catch (err) {
    yield put(getFormError(err));
  }
};

export default function*() {
  yield takeLatest(GET_FORM, getFormWorker);
  yield takeLatest(CREATE_COMMUNITY, createCommunityWorker);
}

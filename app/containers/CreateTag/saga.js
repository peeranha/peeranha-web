import { call, put, takeLatest, select } from 'redux-saga/effects';
import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import { suggestTag } from 'utils/communityManagement';

import { selectEos } from 'containers/EosioProvider/selectors';
import { isAuthorized, isValid } from 'containers/EosioProvider/saga';

import {
  selectUserRating,
  selectUserEnergy,
  makeSelectAccount,
  selectIsGlobalModerator,
} from 'containers/AccountProvider/selectors';

import {
  suggestTagSuccess,
  suggestTagErr,
  getFormProcessing,
  getFormSuccess,
  getFormError,
} from './actions';

import {
  SUGGEST_TAG,
  MIN_ENERGY_TO_CREATE_TAG,
  MIN_RATING_TO_CREATE_TAG,
  CREATE_TAG_BUTTON,
  GET_FORM,
} from './constants';

export function* suggestTagWorker({ tag, reset }) {
  try {
    const eosService = yield select(selectEos);
    const selectedAccount = yield call(eosService.getSelectedAccount);

    yield call(suggestTag, eosService, selectedAccount, tag);

    yield put(suggestTagSuccess());

    yield call(reset);

    yield call(createdHistory.push, routes.suggestedTags(tag.communityId));
  } catch (err) {
    yield put(suggestTagErr(err));
  }
}

export function* checkReadinessWorker({ buttonId }) {
  yield call(isAuthorized);

  yield call(isValid, {
    buttonId: buttonId || CREATE_TAG_BUTTON,
    minRating: MIN_RATING_TO_CREATE_TAG,
    minEnergy: MIN_ENERGY_TO_CREATE_TAG,
  });
}

/* eslint no-empty: 0 */
export function* redirectToCreateTagWorker({ buttonId, communityId }) {
  try {
    yield call(checkReadinessWorker, { buttonId });
    yield call(createdHistory.push, routes.tagsCreate(communityId));
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
      ((userRating < MIN_RATING_TO_CREATE_TAG ||
        userEnergy < MIN_ENERGY_TO_CREATE_TAG) &&
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
  yield takeLatest(SUGGEST_TAG, suggestTagWorker);
}

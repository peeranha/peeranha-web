import { call, put, takeLatest, select } from 'redux-saga/effects';
import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import { createTag, suggestTag } from 'utils/communityManagement';

import { selectEos } from 'containers/EosioProvider/selectors';
import { isAuthorized, isValid } from 'containers/EosioProvider/saga';

import {
  selectUserRating,
  selectUserEnergy,
  makeSelectAccount,
  selectIsGlobalAdmin,
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
  TAGFORM_SUBMIT_BUTTON,
  GET_FORM,
} from './constants';
import { selectEthereum } from '../EthereumProvider/selectors';

export function* suggestTagWorker({ communityId, tag, reset }) {
  try {
    const ethereumService = yield select(selectEthereum);
    const selectedAccount = yield call(ethereumService.getSelectedAccount);
    //
    yield call(createTag, ethereumService, selectedAccount, communityId, tag);
    //
    // yield put(suggestTagSuccess());
    //
    // yield call(reset);
    //
    yield call(createdHistory.push, routes.tags());
  } catch (err) {
    yield put(suggestTagErr(err));
  }
}

export function* checkReadinessWorker({ buttonId, communityId }) {
  yield call(isAuthorized);

  yield call(isValid, {
    buttonId: buttonId || TAGFORM_SUBMIT_BUTTON,
    minRating: MIN_RATING_TO_CREATE_TAG,
    minEnergy: MIN_ENERGY_TO_CREATE_TAG,
    communityId,
  });
}

/* eslint no-empty: 0 */
export function* redirectToCreateTagWorker({ buttonId, communityId }) {
  try {
    yield call(checkReadinessWorker, { buttonId, communityId });

    yield call(createdHistory.push, routes.tagsCreate(communityId));
  } catch (err) {}
}

export function* getFormWorker() {
  try {
    yield put(getFormProcessing());

    const account = yield select(makeSelectAccount());
    const userRating = yield select(selectUserRating());
    const userEnergy = yield select(selectUserEnergy());
    const isGlobalAdmin = yield select(selectIsGlobalAdmin());

    if (
      !account ||
      ((userRating < MIN_RATING_TO_CREATE_TAG ||
        userEnergy < MIN_ENERGY_TO_CREATE_TAG) &&
        !isGlobalAdmin)
    ) {
      yield put(getFormSuccess(false));
    } else {
      yield put(getFormSuccess(true));
    }
  } catch (err) {
    yield put(getFormError(err));
  }
}

export default function*() {
  yield takeLatest(GET_FORM, getFormWorker);
  yield takeLatest(SUGGEST_TAG, suggestTagWorker);
}

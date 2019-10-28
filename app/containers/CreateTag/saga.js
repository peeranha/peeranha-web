import { call, put, takeLatest, select } from 'redux-saga/effects';
import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import { suggestTag } from 'utils/communityManagement';
import { selectEos } from 'containers/EosioProvider/selectors';
import { isAuthorized, isValid } from 'containers/EosioProvider/saga';

import {
  successToastHandlingWithDefaultText,
  errorToastHandlingWithDefaultText,
} from 'containers/Toast/saga';

import { suggestTagSuccess, suggestTagErr } from './actions';

import {
  SUGGEST_TAG,
  SUGGEST_TAG_SUCCESS,
  SUGGEST_TAG_ERROR,
  MIN_ENERGY_TO_CREATE_TAG,
  MIN_RATING_TO_CREATE_TAG,
  CREATE_TAG_BUTTON,
} from './constants';

export function* suggestTagWorker({ tag, reset }) {
  try {
    const eosService = yield select(selectEos);
    const selectedAccount = yield call(eosService.getSelectedAccount);

    yield call(checkReadinessWorker, {});

    yield call(() => suggestTag(eosService, selectedAccount, tag));

    yield put(suggestTagSuccess());

    yield call(reset);

    yield call(() =>
      createdHistory.push(routes.suggestedTags(tag.communityId)),
    );
  } catch (err) {
    yield put(suggestTagErr(err.message));
  }
}

// TODO: test
export function* checkReadinessWorker({ buttonId }) {
  yield call(isAuthorized);

  yield call(isValid, {
    buttonId: buttonId || CREATE_TAG_BUTTON,
    minRating: MIN_RATING_TO_CREATE_TAG,
    minEnergy: MIN_ENERGY_TO_CREATE_TAG,
  });
}

// TODO: test
/* eslint no-empty: 0 */
export function* redirectToCreateTagWorker({ buttonId, communityId }) {
  try {
    yield call(checkReadinessWorker, { buttonId });
    yield call(createdHistory.push, routes.tagsCreate(communityId));
  } catch (err) {}
}

export default function*() {
  yield takeLatest(SUGGEST_TAG, suggestTagWorker);
  yield takeLatest(SUGGEST_TAG_SUCCESS, successToastHandlingWithDefaultText);
  yield takeLatest(SUGGEST_TAG_ERROR, errorToastHandlingWithDefaultText);
}

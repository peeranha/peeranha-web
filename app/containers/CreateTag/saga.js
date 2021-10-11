import { call, put, takeLatest, select } from 'redux-saga/effects';
import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import { createTag } from 'utils/communityManagement';

import { isAuthorized, isValid } from 'containers/EthereumProvider/saga';

import { makeSelectProfileInfo } from 'containers/AccountProvider/selectors';

import {
  suggestTagErr,
  getFormProcessing,
  getFormSuccess,
  getFormError,
} from './actions';

import { SUGGEST_TAG, TAGFORM_SUBMIT_BUTTON, GET_FORM } from './constants';
import { selectEthereum } from '../EthereumProvider/selectors';
import { getPermissions } from '../../utils/properties';

export function* suggestTagWorker({ communityId, tag, reset }) {
  try {
    const ethereumService = yield select(selectEthereum);
    const selectedAccount = yield call(ethereumService.getSelectedAccount);
    yield call(createTag, ethereumService, selectedAccount, communityId, tag);
    yield call(createdHistory.push, routes.tags());
  } catch (err) {
    yield put(suggestTagErr(err));
  }
}

export function* checkReadinessWorker({ buttonId, communityId }) {
  yield call(isAuthorized);

  yield call(isValid, {
    buttonId: buttonId || TAGFORM_SUBMIT_BUTTON,
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

    const profile = yield select(makeSelectProfileInfo());
    const hasPermissions = !!getPermissions(profile).length;
    if (!profile || !hasPermissions) {
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
